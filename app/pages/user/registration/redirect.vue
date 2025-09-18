<template>

    <h1 class="text-2xl font-bold mb-4 text-center">Registration Complete</h1>
    <p class="text-[16px] text-gray-800 dark:text-gray-200 mb-2 text-center">Thank you for registering! You will be redirected to the main page shortly</p>
    <p class="text-[12px] text-gray-700 dark:text-gray-400 text-center">If not redirected automatically click the   <ULink to="/" class="underline text-blue-400">here</ULink></p>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'login' 
})

import { onMounted, onBeforeUnmount  } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();

let intervalID: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  intervalID = setInterval(() => {
    router.push('/')
  }, 3000)
})

onBeforeUnmount(() => {
  if (intervalID) clearInterval(intervalID)
})
</script>