<template>
  <header>
    <div class="flex justify-between items-center px-10 py-4">
      <a href="/" class="text-gray-700 dark:text-gray-200 hover:text-primary font-bold">Smartflood Detect</a>
      <nav class="flex items-center">
        <DarkModeToggle />

         <!-- implement an user auth that recognizes whether user is admin -->
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