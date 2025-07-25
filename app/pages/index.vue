<template>

  <div class="px-8 py-3 md:px-30 sm:py-8 flex flex-col md:grid grid-cols-2 gap-8">
    <LineChart class="h-fit sm:h-full" />
    <!-- <div> -->
    <StatusCard class="h-64 sm:h-full" />
      <!-- <UCard class="w-full h-full" variant="subtle" :ui="{ root: 'flex flex-col', body: 'flex-1' }">
        <template #header>
          Status
        </template>
        <UTextarea
          class="w-full h-full"
          :ui="{
          wrapper: 'h-full',
          base: 'h-full',
          inner: 'h-full resize-none'
        }"
          color="primary"
          autoresize="false"
          :highlight="true"
          variant="outline"
          disabled
          value="This is the value"
        />
      </UCard> -->
    <!-- </div> -->
    <InteractiveMap class="col-span-2 h-94 md:h-150" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'user-default' 
})

import { ref } from 'vue'
const show = ref(false)
// console.log("test");
</script>