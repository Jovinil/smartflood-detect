<script setup>
import { ref, computed } from 'vue'
const colorMode = useColorMode()

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const label = computed(() =>
  colorMode.value === 'dark' ? 'Switch to Light' : 'Switch to Dark'
)
</script>

<template>
  <USwitch
    @click="toggleTheme"
    :label="label"
    unchecked-icon="i-lucide-sun"
    checked-icon="i-lucide-moon"
    default-value
    variant="ghost"
    class="px-4 py-2 rounded text-gray-900 dark:text-gray-100"
    :ui="{ 
      base: 'border-2 border-gray-400 dark:border-gray-600',
     }"
  />
</template>
