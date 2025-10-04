<template>
  <div class="flex flex-col items-center justify-center min-h-screen px-12 bg-gray-200 dark:bg-gray-950 text-gray-900 dark:text-white relative">
    <div class="absolute inset-0 m-auto w-80 md:w-150 h-80 md:h-120  bg-gradient-to-tr from-blue-700 dark:from-primary via-blue-700 dark:via-primary to-primary dark:to-primary rounded-full opacity blur-3xl z-0"></div>

    <div class="w-1/1 md:w-2/4 h-80 md:h-120 flex bg-gray-100 dark:bg-gray-900 items-center rounded-xl justify-center shadow-md shadow-gray-800/10 !p-0 z-10 border-0 max-h-120">
      <div class=" flex-1">
        <div class="px-6">
          <slot/>
        </div>
       
      
      </div>
      <div v-if="!changePass"  class="flex-1 hidden md:flex items-center  h-full z-50 rounded-tr-xl rounded-br-xl">
        <NuxtImg 
          src="/img/light_mode-1.png" 
          alt="Flood Hazard Icon" 
          class="w-1/1 h-2/3 rounded-tr-xl rounded-br-xl"
          fit="cover"
          loading="lazy"
        />
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from '#imports'

const route = useRoute();

const changePass = computed(() => route.name === 'admin-change-password')
</script>