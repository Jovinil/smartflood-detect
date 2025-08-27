<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<template>
  <!-- InteractiveMap container -->
  <div class="relative w-full h-screen border p-4">
    <UButton label="Open Dialog" @click="isOpen = true" />

    <!-- Contained Modal -->
    <UModal
      v-model="isOpen"
      :teleport="false"
      :ui="{
        overlay: 'absolute inset-0 flex justify-center items-center bg-elevated/75'
      }"
    >
      <div class="p-6 bg-white rounded-lg shadow-xl">
        <h2 class="text-xl font-semibold">Map Dialog</h2>
        <p>This modal floats only inside the InteractiveMap container.</p>

        <UButton color="primary" @click="isOpen = false">Close</UButton>
      </div>
    </UModal>
  </div>
</template>
