<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useThemeStore } from '~/app/stores/useThemeStore'

const themeStore = useThemeStore()

onMounted(() => {
  // make sure Pinia state matches Nuxt color mode on load
  themeStore.init()
})

const label = computed(() =>
  themeStore.colorMode === 'dark' ? 'Switch to Light' : 'Switch to Dark'
)

const isDark = computed({
  get: () => themeStore.colorMode === 'dark',
  set: (val: boolean) => {
    themeStore.colorMode = val ? 'dark' : 'light'
  }
})

</script>

<template>
  <USwitch
    @click="themeStore.toggleLightDark"
    :label="label"
    v-model="isDark"
    unchecked-icon="i-lucide-sun"
    checked-icon="i-lucide-moon"
    variant="ghost"
    class="px-4 py-2 rounded text-gray-900 dark:text-gray-100"
    :ui="{ base: 'border-2 border-gray-400 dark:border-gray-600' }"
  />
</template>
