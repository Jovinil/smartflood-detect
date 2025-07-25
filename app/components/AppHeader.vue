<template>
  <header>
    <div class="container flex justify-between items-center px-10 py-4">
      <a href="/" class="text-primary font-bold">Smartflood Detect</a>
      <nav>
        <DarkModeToggle />
        <BaseModal />
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>