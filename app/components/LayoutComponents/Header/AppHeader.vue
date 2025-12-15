<template>
  <header class="h-20">
    <div class="flex justify-between items-center px-10 py-4">
      <a href="/" class="text-gray-700 dark:text-gray-200 hover:text-primary font-bold">BAHAWATCH</a>
      <nav class="flex items-center">
        <DarkModeToggle />

        <Profile v-if="user"/>

        <BaseModal  v-else/>
      </nav>
    </div>
  </header>
</template>


<script setup lang="ts">
import { useCurrentUser } from 'vuefire'

const user = useCurrentUser()
</script>