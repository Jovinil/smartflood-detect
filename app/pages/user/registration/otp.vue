<template>
    <ThemeToggle />
    <div class="flex justify-center mt-3">

      <div>

        <h1 class="text-2xl font-bold mb-4">You're almost there!</h1>
        <p class="text-[16px] text-gray-800 dark:text-gray-200">OTP</p>
        <p class="text-[12px] text-gray-600 dark:text-gray-400 mb-2">Verifying phone: {{ otpStore.phoneNumber }}</p>
        <div ref="recaptchaDiv"></div>

        <div class="text-center w-full">
          <UPinInput 
            :length="6"
            v-model="otpStore.verificationCode"
          />
            
        
          <p v-if="otpStore.errorMessage" class="text-red-500">{{ otpStore.errorMessage }}</p>
        </div>

        <div class="text-end mt-3">
          <p class="text-sm"> 
            Didn't receive code?
            
            <UButton 
              @click="otpStore.sendCode()"
              :disabled="otpStore.isSending"
              variant="link"
              color="info"
              :ui="{ base: 'p-0' }"
            >
              {{ otpStore.isSending ? 'Sending...' : 'Resend Code' }}
            </UButton>

          </p>
          
          <UButton 
            @click="handleVerifyCode"
            :disabled="otpStore.isVerifying"
            class="mt-2"
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

import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useAuthOtpStore } from '~/app/stores/useAuthOtpStore'
import { useRouter } from 'vue-router'

const router = useRouter();
const otpStore = useAuthOtpStore();
const recaptchaDiv = ref<HTMLElement | null>(null)

const handleVerifyCode = async () => {
  const success = await otpStore.verifyCode()
  if (success) {
    router.push('/user/registration/redirect')
  }
}


onMounted(() => {
  otpStore.recaptchaContainer = recaptchaDiv.value
  otpStore.initRecaptcha()
})

onBeforeUnmount(() => {
  otpStore.clearRecaptcha()
})
</script>