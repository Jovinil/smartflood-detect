// composables/useMapbox.ts
import { ref, watch, onMounted, onUnmounted } from "vue"
import { useThemeStore } from "~/app/stores/useThemeStore"
import { useMapStore } from "~/app/stores/useMapStore"
import { useLocationStore } from "../stores/useLocationStore"

import "mapbox-gl/dist/mapbox-gl.css"
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"

export function useMapbox(mapContainer: Ref<HTMLElement | null>, geocoderContainer: Ref<HTMLElement | null>) {
  const map = ref<any>(null)
  const mapboxgl = ref<any>(null)
  const deviceMarkers = ref<{ id: string, marker: any, originalLngLat?: {lng: number, lat: number} }[]>([])
  const address = ref<string | null>('')
  const mapLoaded = ref(false)

  const themeStore = useThemeStore()
  const mapStore = useMapStore()
  const config = useRuntimeConfig()
  const useLocation = useLocationStore()

  // --- Reverse Geocode ---
  const reverseGeocode = async (lng: number, lat: number): Promise<string | null> => {
    try {
      const resp = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${config.public.mapboxToken}`
      )
      const data = await resp.json()

      // setted value of address in mapStore as .text not .place_name
      return data.features?.[0]?.place_name || null
    } catch (err) {
      console.error("Reverse geocode failed:", err)
      return null
    }
  }

  // --- Handle map double-click to move marker ---
const handleMapDblClick = async (e: any) => {
  map.value?.doubleClickZoom.disable()
  if (!mapStore.editEnabled) return   // ⬅️ only works when edit is enabled

  const selectedID = mapStore.selectedDevice
  if (!selectedID) return

  const device = deviceMarkers.value.find(d => d.id === selectedID.moduleID)
  if (!device) return

  const { lng, lat } = e.lngLat
  device.marker.setLngLat([lng, lat])
  mapStore.setPosition(lng, lat)
  await setAddress(lng, lat)
  
  const popup = device.marker.getPopup() || new mapboxgl.value.Popup()
  popup.setText(address.value || "Unknown")
  device.marker.setPopup(popup)

  map.value?.doubleClickZoom.enable()
}

  // --- Enable/Disable Editing ---
  const editDeviceMarker = async (e?: any) => {
    const selectedID = mapStore.selectedDevice
    if(!selectedID) return

    const device = deviceMarkers.value.find(d => d.id === selectedID.moduleID)
    if(!device) return

    device.marker.setDraggable(true)
    const lngLat = device.marker.getLngLat()
    device.originalLngLat = { lng: lngLat.lng, lat: lngLat.lat }
    
    // always re-bind dragend listener
    device.marker.off("dragend")
    device.marker.on("dragend", async () => {
      const lngLat = device.marker.getLngLat()
      mapStore.setPosition(lngLat.lng, lngLat.lat)
      await setAddress(lngLat.lng, lngLat.lat)
      device.marker.setPopup(new mapboxgl.value.Popup().setText(address.value || "Unknown"))
    })
  }

  const disableEditing = () => {
    const selectedID = mapStore.selectedDevice
    if(!selectedID) return

    const device = deviceMarkers.value.find(d => d.id === selectedID.moduleID)
    if(device){
      device.marker.setDraggable(false)
    }  
  }

  const centerMapOnDevice = () => {
    const selectedID = mapStore.selectedDevice
    if(!selectedID) return

    if (!map.value || !mapLoaded.value) {
      console.warn("Map not ready yet. Waiting for load to center...")

      // Ensure we only trigger once, even if called multiple times
      const unwatch = watch(
        mapLoaded,
        (loaded) => {
          if (loaded) {
            unwatch()
            nextTick(() => centerMapOnDevice())
          }
        },
        { immediate: false } // <-- important: don’t trigger instantly
      )
      return
    }

    map.value.flyTo({
      center: [selectedID.longitude, selectedID.latitude], // [longitude, latitude]
      zoom: 16,           // optional, keep or adjust
      speed: 300,         // optional, controls animation speed
      essential: true     // ensures animation works with prefers-reduced-motion
    })
  }

  const cancelEditDeviceMarker = () => {
    const selectedID = mapStore.selectedDevice
    if(!selectedID) return

    const device = deviceMarkers.value.find(d => d.id === selectedID.moduleID)
    if(device?.originalLngLat){
      console.log('cancelling edit, reverting to original position')
      device.marker.setLngLat([ device.originalLngLat.lng, device.originalLngLat.lat ])
      mapStore.setPosition(device.originalLngLat.lng, device.originalLngLat.lat)
    
      device.marker.setDraggable(false)
      delete device.originalLngLat 
    }
  }

  async function setAddress(lng: number, lat: number) {
    address.value = await reverseGeocode(lng, lat)
    mapStore.setAddressStore(address.value!)
  }

  const renderDevicePins = (devices: any[]) => {
    deviceMarkers.value.forEach(m => m.marker.remove())
    deviceMarkers.value = []

    devices
    .filter(d => d.longitude !== null && d.latitude !== null)
    .forEach(d => {
      const color =
        d.currentWaterLevelStatus === 'safe'
          ? 'green'
          : d.currentWaterLevelStatus === 'warning'
          ? 'orange'
          : d.currentWaterLevelStatus === 'danger'
          ? 'red'
          : 'blue'

      const marker = new mapboxgl.value.Marker({ color, draggable: false })
        .setLngLat([d.longitude, d.latitude])
        .setPopup(
          new mapboxgl.value.Popup().setHTML(`
            <div class="text-sm text-gray-800">
              <strong>${d.deviceName}</strong><br/>
              Location: ${d.locationName}<br/>
              Status: ${d.currentWaterLevelStatus || 'Unknown'}<br/>
              Water Level: ${d.currentWaterLevel ?? 'N/A'}
            </div>
          `)
        )
        .addTo(map.value)

      deviceMarkers.value.push({
        id: d.moduleID,
        marker
      })
    })
  }

  // --- Lifecycle ---
  onMounted(async () => {
    const mod = await import("mapbox-gl")
    mapboxgl.value = mod.default || mod
    mapboxgl.value.accessToken = config.public.mapboxToken

    const { default: MapboxGeocoder } = await import("@mapbox/mapbox-gl-geocoder")

    if (!mapContainer.value) return

    map.value = new mapboxgl.value.Map({
      container: mapContainer.value,
      style: "mapbox://styles/mapbox/standard",
      config: { basemap: { lightPreset: themeStore.mapLightPreset } },
      center: [124.22636, 13.57884],
      zoom: 16.7,
      bearing: 0,
      pitch: 49,
    })

    // Add Geocoder control
    const geocoder = new MapboxGeocoder({
      accessToken: config.public.mapboxToken,
      mapboxgl: mapboxgl.value,
      marker: false,
      placeholder: "Search for an address",
    })

    if (geocoderContainer.value) {
      geocoderContainer.value.appendChild(geocoder.onAdd(map.value))
    }

    map.value.on("load", async () => {
      mapLoaded.value = true

      await new Promise((r) => setTimeout(r, 100))
      // ✅ Always center once map is loaded
      if (mapStore.selectedDevice) {
        centerMapOnDevice()
      }
    })


    // Handle resize
    window.addEventListener("resize", () => {
      if (map.value) map.value.resize()
    })

    // Watch theme changes
    watch(
      () => themeStore.colorMode,
      () => {
        if (map.value) {
          map.value.setConfigProperty("basemap", "lightPreset", themeStore.mapLightPreset)
          map.value.resize()
        }
      }
    )

    // Watch editing mode
    watch(
      () => mapStore.editEnabled,
      (enabled) => {
        if (enabled){
          map.value?.on("click", editDeviceMarker)
          map.value?.on("dblclick", handleMapDblClick)
        }
        else disableEditing() 
      }
    )

    watch(
      () => mapStore.isCancelled,
      (cancelled) => {
        if (cancelled) {
          cancelEditDeviceMarker()

          mapStore.editEnabled = false
          mapStore.isCancelled = false
        }
      }
    )

    watch(
      () => mapStore.isDeviceSelected,
      async (selected) => {
        if (selected) {
          await nextTick()
          centerMapOnDevice()
          setTimeout(() => (mapStore.isDeviceSelected = false), 300)
        }
      }
    )

    watch(
      () => useLocation.devices,
      (devices) => {
        if (map.value) renderDevicePins(devices)
      },
      { immediate: true, deep: true }
    )
  })

  onUnmounted(() => {
    if (map.value) {
      map.value.remove()
      map.value = null
    }
    mapLoaded.value = false
  })

  return {
    map,
    deviceMarkers,
    reverseGeocode,
    editDeviceMarker,
    cancelEditDeviceMarker,
    centerMapOnDevice,
    disableEditing,
    renderDevicePins
  }
}
