<script setup lang="ts">
definePageMeta({
  layout: 'empty'
})
</script>


<template>
  <div class="flex flex-col md:flex-row gap-3 justify-center h-full min-h-screen  px-4 py-5 md:p-0 md:gap-0">
    <InteractiveMapContent />
    <Sidebar />
    
  </div>
</template>