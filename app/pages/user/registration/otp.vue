<template>

    <h1 class="text-2xl font-bold mb-4">You're almost there!</h1>
    <p class="text-[16px] text-gray-800 dark:text-gray-200">OTP</p>
    <p class="text-[12px] text-gray-600 dark:text-gray-400 mb-2">Input the OTP we sent to your number</p>
    <!-- <UInput 
      color="neutral" 
      variant="subtle" 
      icon="i-lucide-phone" 
      placeholder="09123456789" 
      type="text"
      inputmode="numeric"
      pattern="[0-9]*"
      maxlength="11"
      class="mb-4 w-full"
    /> -->
    <div class="text-center">
     <UPinInput :length="4" />
    </div>
    
  
     <div class="text-end w-full">
       <button @click="">Send OTP</button>
    <div id="recaptcha"></div>
    <input  placeholder="Enter OTP" />
    <button @click="">Verify</button>
      <!-- <UButton color="primary" variant="outline  " to="/user/registration/redirect">Submit</UButton> -->
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'login' 
})

</script>