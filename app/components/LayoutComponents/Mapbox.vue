<template>
  <ClientOnly>
    <div ref="mapContainer" class="map-container flex-1"></div>
  </ClientOnly>
</template>

<script>
import "mapbox-gl/dist/mapbox-gl.css";
import { useThemeStore } from "~/app/stores/theme"; // <-- import your Pinia store

export default {
  data() {
    return { map: null, mapboxgl: null, themeStore: null };
  },

  async mounted() {
  const { public: { mapboxToken } } = useRuntimeConfig();
  this.themeStore = useThemeStore();

  const mod = await import("mapbox-gl");
  this.mapboxgl = mod.default || mod;
  this.mapboxgl.accessToken = mapboxToken;

  this.map = new this.mapboxgl.Map({
    container: this.$refs.mapContainer,
    style: "mapbox://styles/mapbox/standard",
    config: { basemap: { lightPreset: this.themeStore.mapLightPreset } },
    center: { lng: 124.22636, lat: 13.57884 },
    zoom: 16.7,
    bearing: 0,
    pitch: 49,
  });

  this.map.setMaxBounds([
  [124.2200, 13.5700], // SW
  [124.2330, 13.5880]  // NE
]);

  this.marker = null;

  this.map.on("click", (e) => {
    console.log(`Clicked at: ${e.lngLat.lng}, ${e.lngLat.lat}`);

    if (!this.marker) {
      // Create draggable marker
      this.marker = new this.mapboxgl.Marker({ color: "red", draggable: true })
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .setPopup(new this.mapboxgl.Popup().setText("Drag me to set device location!"))
        .addTo(this.map);

      // Listen for drag end event
      this.marker.on("dragend", () => {
        const lngLat = this.marker.getLngLat();
        console.log(`Marker dragged to: ${lngLat.lng}, ${lngLat.lat}`);
      });
    }

    // Update position when map is clicked
    this.marker.setLngLat([e.lngLat.lng, e.lngLat.lat]);
  });
  // 🔑 Force map to resize when viewport changes
  window.addEventListener("resize", () => {
    if (this.map) this.map.resize()
  });

  // Watch theme changes
  this.$watch(
    () => this.themeStore.colorMode,
    () => {
      if (this.map) {
        this.map.setConfigProperty(
          "basemap",
          "lightPreset",
          this.themeStore.mapLightPreset
        )
        this.map.resize() // also helpful after style update
      }
    }
  )

},

  unmounted() {
    if (this.map) this.map.remove();
    this.map = null;
  },
};
</script>