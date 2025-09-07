<template>
  <ClientOnly>
    <div class="relative flex-1">
    <!-- Custom wrapper -->
      
      <div ref="geocoderContainer" class="absolute top-2 right-2 md:px-4 md:right-0 md:top-4 w-6/7 md:w-120  z-10"></div>
      <!-- Map -->
      <div ref="mapContainer" class="w-full h-full">
        
      </div>
    </div>
  </ClientOnly>
</template>


<script>
import "mapbox-gl/dist/mapbox-gl.css"
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"
import { useThemeStore } from "~/app/stores/useThemeStore"
import { useMapStore } from "~/app/stores/useMapStore"

export default {
  data() {
    return {
      map: null,
      mapboxgl: null,
      themeStore: null,
      marker: null,
    }

  },

  async mounted() {
    const mapStore = useMapStore()
    const {
      public: { mapboxToken },
    } = useRuntimeConfig()
    this.themeStore = useThemeStore()

    const mod = await import("mapbox-gl")
    this.mapboxgl = mod.default || mod
    this.mapboxgl.accessToken = mapboxToken

    // Import geocoder dynamically
    const { default: MapboxGeocoder } = await import(
      "@mapbox/mapbox-gl-geocoder"
    )

    this.map = new this.mapboxgl.Map({
      container: this.$refs.mapContainer,
      style: "mapbox://styles/mapbox/standard",
      config: { basemap: { lightPreset: this.themeStore.mapLightPreset } },
      center: [124.22636, 13.57884], // use [lng, lat]
      zoom: 16.7,
      bearing: 0,
      pitch: 49,
    })
    
    // Add Geocoder control
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxToken,
      mapboxgl: this.mapboxgl,
      marker: false, // disable default marker
      placeholder: "Search for an address",
      id: 'geocoder',
    })

    this.$refs.geocoderContainer.appendChild(geocoder.onAdd(this.map))

    // Handle resize
    window.addEventListener("resize", () => {
      if (this.map) this.map.resize()
    })

    // Watch theme changes
    watch(
      () => this.themeStore.colorMode,
      () => {
        if (this.map) {
          this.map.setConfigProperty(
            "basemap",
            "lightPreset",
            this.themeStore.mapLightPreset
          )
          this.map.resize()
        }
      }
    )

    // watch if device is editing 
    watch(
      () => mapStore.editEnabled,
      (enabled) => {
        if (enabled) {
          this.enableEditing()
        } else {
          this.disableEditing()
        }
      }
    )
  },

  methods: {
    async reverseGeocode(lng, lat) {
      try {
        const { public: { mapboxToken } } = useRuntimeConfig()
        const resp = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxToken}`
        )
        const data = await resp.json()
        return data.features?.[0]?.place_name || null
      } catch (err) {
        console.error("Reverse geocode failed:", err)
        return null
      }
    },

    async enableEditing() {
      this.map.on("dblclick", this.handleClick)
      if (this.marker) this.marker.setDraggable(true) 
    },
    async disableEditing() {
      this.map.off("dblclick", this.handleClick)
      if (this.marker) this.marker.setDraggable(false)
    },

    async handleClick(e) {
      const { lng, lat } = e.lngLat
      const address = await this.reverseGeocode(lng, lat)

      if (!this.marker) {
        this.marker = new this.mapboxgl.Marker({ color: "red", draggable: true })
          .setLngLat([lng, lat])
          .setPopup(new this.mapboxgl.Popup().setText("Drag me to set device location!"))
          .addTo(this.map)

        this.marker.on("dragend", async () => {
          const lngLat = this.marker.getLngLat()
          const addr = await this.reverseGeocode(lngLat.lng, lngLat.lat)
          this.marker.setPopup(new this.mapboxgl.Popup().setText(addr || "Unknown"))
        })
      }

      this.marker.setLngLat([lng, lat])
      this.marker.setPopup(new this.mapboxgl.Popup().setText(address || "Unknown"))
    }
  },
  

  unmounted() {
    if (this.map) this.map.remove()
    this.map = null
  },
}
</script>