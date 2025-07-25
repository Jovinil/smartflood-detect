<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div class="relative bg-white rounded-lg p-6 z-10 max-w-lg w-full">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold">{{ title }}</h3>
          <button @click="close" class="text-gray-500 hover:text-gray-700">&times;</button>
        </div> awd
        <div><slot /></div>
        <div class="text-right mt-4">
          <button @click="close" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Close</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  title: { type: String, default: 'Modal Title' },
})
const emit = defineEmits(['update:isOpen'])

function close() {
  emit('update:isOpen', false)
}
</script>

<style>
.absolute.inset-0 {
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}
</style>
