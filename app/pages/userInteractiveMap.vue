<script setup lang="ts">
definePageMeta({
  layout: 'empty'
})
</script>

<template>
  <div class="flex flex-col md:flex-row gap-5 justify-center h-auto md:h-screen p-6 md:p-12">
    <InteractiveMapContent />
    <Sidebar />
  </div>
</template>