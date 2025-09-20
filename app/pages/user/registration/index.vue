<template>
    <ThemeToggle />
    <h1 class="text-2xl font-bold my-4 text-center">Registration Portal</h1>
    <p class="text-[12px] text-gray-700 dark:text-gray-400 mb-2">Phone Number</p>
    <UInput 
      color="neutral" 
      variant="subtle" 
      icon="i-lucide-phone" 
      placeholder="+639123456789" 
      type="text"
      inputmode="numeric"
      pattern="[0-9]*"
      maxlength="13"
      class="mb-4 w-full"
      v-model="otpStore.phoneNumber"
    />
    <div ref="recaptchaDiv"></div>
    <button >
      
    </button>
    <p v-if="otpStore.errorMessage" class="text-red-500">{{ otpStore.errorMessage }}</p>

    <div class="text-end w-full">
      <UButton 
        :color="themeStore.colorMode === 'light' ? 'info' : 'primary'" 
        variant="solid" 
        :disabled="otpStore.isSending" 
        @click="handleSendOtp()"
        >
          {{ otpStore.isSending ? 'Sending...' : 'Send OTP' }}
        </UButton>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'login' 
})

import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthOtpStore } from '~/app/stores/useAuthOtpStore'
import { useThemeStore } from '~/app/stores/useThemeStore'

const otpStore = useAuthOtpStore()
const router = useRouter()
const themeStore = useThemeStore()
const recaptchaDiv = ref<HTMLElement | null>(null)

onMounted(() => {
  otpStore.recaptchaContainer = recaptchaDiv.value
  otpStore.initRecaptcha()
})

onBeforeUnmount(() => {
  otpStore.clearRecaptcha()
})

// Wrapper to handle redirect after OTP is sent
const handleSendOtp = async () => {
  const success = await otpStore.sendCode()
  if (success) {
    router.push('/user/registration/otp') 
  }
}
</script>