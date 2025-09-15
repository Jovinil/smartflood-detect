<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth'
import type { ConfirmationResult } from 'firebase/auth'

const phoneNumber = ref('')
const verificationCode = ref('')
const confirmationResult = ref<ConfirmationResult | null>(null)
const recaptchaContainer = ref<HTMLElement | null>(null)
let recaptchaVerifier: RecaptchaVerifier | null = null

onMounted(() => {
  const auth = getAuth()

  recaptchaVerifier = new RecaptchaVerifier(
    auth,                       
    recaptchaContainer.value!,  
    {                           
      size: 'invisible',
      callback: (response: string) => {
        console.log('reCAPTCHA solved:', response);
      },
      'expired-callback': () => {
        console.warn('reCAPTCHA expired');
      }
    }
  )

  recaptchaVerifier.render();
})

const sendCode = async () => {
  const auth = getAuth();
  console.log(phoneNumber.value)
  try {
    if (!recaptchaVerifier) throw new Error('Recaptcha not initialized')
    confirmationResult.value = await signInWithPhoneNumber(auth, phoneNumber.value, recaptchaVerifier)
    alert('Verification code sent!')
  } catch (error) {
    console.log('Error sending code:', error)
  }
}

const verifyCode = async () => {
  try {
    if (!confirmationResult.value) throw new Error('No confirmation result')
    await confirmationResult.value.confirm(verificationCode.value)
    alert('Phone number verified and user signed in!')
  } catch (error) {
    console.error('Error verifying code:', error)
  }
}
</script>

<template>
  <div>
    <input type="tel" v-model="phoneNumber" placeholder="Enter phone number" />
    <button @click="sendCode">Send Code</button>
    <div ref="recaptchaContainer"></div>

    <template v-if="confirmationResult">
      <input type="text" v-model="verificationCode" placeholder="Enter verification code" />
      <button @click="verifyCode">Verify Code</button>
    </template>
  </div>
</template>
