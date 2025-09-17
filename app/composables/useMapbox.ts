// composables/useMapbox.ts
import { ref, watch, onMounted, onUnmounted } from "vue"
import { useThemeStore } from "~/app/stores/useThemeStore"
import { useMapStore } from "~/app/stores/useMapStore"

import "mapbox-gl/dist/mapbox-gl.css"
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"

export function useMapbox(mapContainer: Ref<HTMLElement | null>, geocoderContainer: Ref<HTMLElement | null>) {
  const map = ref<any>(null)
  const mapboxgl = ref<any>(null)
  const marker = ref<any>(null)
  const address = ref<string | null>('')

  const themeStore = useThemeStore()
  const mapStore = useMapStore()
  const config = useRuntimeConfig()

  // --- Reverse Geocode ---
  const reverseGeocode = async (lng: number, lat: number): Promise<string | null> => {
    try {
      const resp = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${config.public.mapboxToken}`
      )
      const data = await resp.json()
      return data.features?.[0]?.place_name || null
    } catch (err) {
      console.error("Reverse geocode failed:", err)
      return null
    }
  }

  // --- Enable/Disable Editing ---
  const enableEditing = () => {
    map.value?.on("dblclick", handleClick)
    if (marker.value) marker.value.setDraggable(true)
  }

  const disableEditing = () => {
    map.value?.off("dblclick", handleClick)
    if (marker.value) marker.value.setDraggable(false)
  }

  async function setAddress(lng: number, lat: number) {
    address.value = await reverseGeocode(lng, lat)
  }

  // --- Handle Map Click ---
  const handleClick = async (e: any) => {
    const { lng, lat } = e.lngLat
    await setAddress(lng, lat)
    mapStore.setPosition(lng, lat)

    if (!marker.value) {
      marker.value = new mapboxgl.value.Marker({ color: "red", draggable: true })
        .setLngLat([lng, lat])
        .setPopup(new mapboxgl.value.Popup().setText("Drag me to set device location!"))
        .addTo(map.value)

      marker.value.on("dragend", async () => {
        const lngLat = marker.value.getLngLat()
        mapStore.setPosition(lng, lat)
        await setAddress(lng, lat)
        marker.value.setPopup(new mapboxgl.value.Popup().setText(address || "Unknown"))

      })
    }

    marker.value.setLngLat([lng, lat])
    marker.value.setPopup(new mapboxgl.value.Popup().setText(address || "Unknown"))
  }

  const passValue = async () => {

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
        if (enabled) enableEditing()
        else disableEditing()
      }
    )

    watch(
      () => mapStore.isConfirmed,
      (saved) => {
        if (saved) {
          const wan = mapStore.address = address.value
          const taw = mapStore.position
          console.log(wan)
          console.log(taw)
        }
      }
    )
  })

  onUnmounted(() => {
    if (map.value) map.value.remove()
    map.value = null
  })

  return {
    map,
    marker,
    reverseGeocode,
    enableEditing,
    disableEditing,
  }
}
