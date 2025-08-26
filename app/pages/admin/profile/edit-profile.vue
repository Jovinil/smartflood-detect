<template>
    <!-- <div class="flex justify-center gap-2">
        <UButton color="primary" variant="outline" to="/admin/registration/otp">Login</UButton>
        <UButton color="primary" variant="outline" to="/admin/registration/otp">Login</UButton>
        
    </div> -->
   <h1 class="text-2xl font-bold mb-4 text-center">Your Profile</h1>
   <div>
        <p class="text-[12px] text-gray-700 dark:text-gray-400 mb-2">Username</p>
            <UInput 
            color="neutral" 
            variant="subtle" 
            icon="i-lucide-user" 
            placeholder="Username" 
            type="text"
            class="mb-3 w-full"
        />

   </div>
   <div>
        <p class="text-[12px] text-gray-700 dark:text-gray-400 mb-2">Password</p>
        <UInput 
        color="neutral" 
        variant="subtle" 
        icon="i-lucide-lock" 
        placeholder="Password" 
        type="password"
        class="mb-3 w-full"
        />

   </div>
   
    <div class="text-end w-full">
      <UButton color="primary" variant="outline" to="/admin/profile/editing-profile">Login</UButton>
    </div>
</template>

<script setup>
definePageMeta({
  layout: 'login' 
})
</script>