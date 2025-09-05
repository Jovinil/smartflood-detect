import { defineStore } from 'pinia'
import { useColorMode } from '#imports'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    colorMode: 'system' as 'light' | 'dark' | 'system',
  }),

  getters: {
    // Mapbox-friendly preset
    mapLightPreset: (state) => {
      if (state.colorMode === 'dark') return 'night'
      if (state.colorMode === 'light') return 'day'
      return 'day' // default for 'system'
    },
  },
  
  actions: {
    init() {
      const cm = useColorMode()
      this.colorMode = cm.preference as 'light' | 'dark' | 'system'

    },
    toggleLightDark() {
      const cm = useColorMode()
      this.colorMode = this.colorMode === 'light' ? 'dark' : 'light'
      cm.preference = this.colorMode
    },
    toggleLight() {
      const cm = useColorMode()
      this.colorMode = 'light'
      cm.preference = 'light'
    },
    toggleDark() {
      const cm = useColorMode()
      this.colorMode = 'dark'
      cm.preference = 'dark'
    },
  },
})
