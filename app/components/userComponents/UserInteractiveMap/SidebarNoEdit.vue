<template>
    <div class="flex flex-col h-auto md:flex-1 p-4 rounded-md shadow-xl bg-gray-100 dark:bg-gray-950">
      <UCollapsible v-model:open="openOne" class="flex flex-col gap-2 w-full mb-3" 
      :ui="{
        content: 'bg-gray-600 rounded-sm px-3 py-2'
      }">
        <UButton
          label="Device Information"
          color="neutral"
          variant="subtle"
          trailing-icon="i-lucide-chevron-down"
          block
        />

        <template #content>
         awdawd
        </template>
      </UCollapsible>
      <UCollapsible v-model:open="openTwo" class="flex flex-col gap-2 w-full" 
      :ui="{
        content: 'bg-gray-600 rounded-sm px-3 py-2'
      }">
        <UButton
          label="Environmental Data"
          color="neutral"
          variant="subtle"
          trailing-icon="i-lucide-chevron-down"
          block
        />

        <template #content>
         awdawd
        </template>
      </UCollapsible>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import { defineShortcuts } from 'path-to-utils' // or auto-import

const openOne = ref(true)
const openTwo = ref(true)

defineShortcuts({
  o: () => {
    openOne.value = !openOne.value
  },
  p: () => {
    openTwo.value = !openTwo.value
  }
})
</script>