<template>

  <div class="px-8 py-3 md:px-30 sm:py-8 flex flex-col md:grid grid-cols-2 gap-8">
    <LineChart class="h-fit sm:h-full" />
    
    <StatusCard class="h-64 sm:h-full" />

    <InteractiveMapCard class="col-span-2 h-94 md:h-150" />
  </div>
</template>

<script setup>
// definePageMeta({
//   layout: 'user-default' 
// })

import { ref } from 'vue'

const show = ref(false)
// console.log("test");
</script>