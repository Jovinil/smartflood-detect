<template>
    <ThemeToggle />
    <h1 class="text-2xl font-bold my-4 text-center">Registration Portal</h1>
    <p class="text-[12px] text-gray-700 dark:text-gray-400 mb-2">Phone Number</p>
    <UInput 
      color="neutral" 
      variant="subtle" 
      icon="i-lucide-phone" 
      placeholder="09123456789" 
      type="text"
      inputmode="numeric"
      pattern="[0-9]*"
      maxlength="11"
      class="mb-4 w-full"
    />

    <div class="text-end w-full">
      <UButton color="primary" variant="outline" to="/user/registration/otp">Register</UButton>
    </div>
</template>

<script setup>
definePageMeta({
  layout: 'login' 
})
</script>