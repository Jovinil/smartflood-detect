<template>
    <ThemeToggle />
    <div class="flex justify-center mt-3">

      <div>

        <h1 class="text-2xl font-bold mb-4">You're almost there!</h1>
        <p class="text-[16px] text-gray-800 dark:text-gray-200">OTP</p>
        <p class="text-[12px] text-gray-600 dark:text-gray-400 mb-2">Verifying phone: {{ otpStore.phoneNumber }}</p>

        <div class="ext-center w-full">
          <UPinInput 
            :length="6"
            v-model="otpStore.verificationCode"
          />
          <p v-if="otpStore.errorMessage" class="text-red-500">{{ otpStore.errorMessage }}</p>
        </div>

        <div class="text-end mt-3">
          <div id="recaptcha"></div>
          <UButton 
            @click="otpStore.verifyCode"
            :disabled="otpStore.isVerifying"
          >
            {{ otpStore.isVerifying ? 'Verifying...' : 'Verify Code' }}
          </UButton>
        </div>

      </div>
  
    </div>
   
    
   

</template>

<script setup lang="ts">
definePageMeta({
  layout: 'login' 
})

import { useAuthOtpStore } from '~/app/stores/useAuthOtpStore'

const otpStore = useAuthOtpStore()

const hi = () => {
  console.log("code", otpStore.verificationCodeString)
}

watch(() => otpStore.verificationCode, (val) => {
  console.log('verificationCode array:', val)
})

watch(() => otpStore.verificationCodeString, (val) => {
  console.log('verificationCodeString:', val)
})
</script>