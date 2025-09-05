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
