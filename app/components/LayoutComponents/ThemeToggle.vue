<template>
    <div class="flex justify-center gap-2">
        <UButton 
            @click="themeStore.toggleLight"  
            :active="themeStore.colorMode === 'light'" 
            :ui="{base: 'h-10 px-3'}" 
            active-class="bg-primary !text-gray-100"
            inactive-class=""
            color="primary" 
            variant="outline">
            Light
        </UButton>
        <UButton 
            @click="themeStore.toggleDark"   
            :active="themeStore.colorMode === 'dark'" 
            :ui="{base: 'h-10 px-3'}"
            active-class="bg-primary !text-gray-800"
            inactive-class=""
            color="primary" 
            variant="outline">
            Dark
        </UButton>
    </div>
 
</template>

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

</script>