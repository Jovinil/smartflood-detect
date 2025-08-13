<template>
  <div>
    <AppHeader />
    <slot />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(false)
// console.log("test");
</script>
