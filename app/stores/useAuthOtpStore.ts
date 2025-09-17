import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from 'firebase/auth'
import type { ConfirmationResult } from 'firebase/auth'

export const useAuthOtpStore = defineStore('authOtp', () => {
  /** ======================
   * STATE
   * ====================== */
  const phoneNumber = ref('')
  const verificationCode = ref<string[]>([])
  const confirmationResult = ref<ConfirmationResult | null>(null)

  // UI state flags
  const isSending = ref(false)
  const isVerifying = ref(false)
  const errorMessage = ref('')

  // DOM element for reCAPTCHA
  const recaptchaContainer = ref<HTMLElement | null>(null)

  // reCAPTCHA instance (non-reactive)
  let recaptchaVerifier: RecaptchaVerifier | null = null

  const verificationCodeString = computed(() => verificationCode.value.join(''))
  /** ======================
   * ACTIONS
   * ====================== */

  // Initialize the invisible reCAPTCHA
  const initRecaptcha = () => {

    if (!recaptchaContainer.value) {
      console.warn('No recaptcha container set')
      return
    }

    const auth = getAuth()
    recaptchaVerifier = new RecaptchaVerifier(
      auth,
      recaptchaContainer.value,
      {
        size: 'invisible',
        callback: (response: string) => {
          console.log('reCAPTCHA solved:', response)
        },
        'expired-callback': () => {
          console.warn('reCAPTCHA expired')
        }
      }
    )

    recaptchaVerifier.render().catch((err) => {
      console.error('Error rendering reCAPTCHA:', err)
    })
  }

  // Send OTP SMS
  const sendCode = async () => {
    const auth = getAuth();
    errorMessage.value = '';
    isSending.value = true;

    try {
      if (!recaptchaVerifier) throw new Error('Recaptcha not initialized');
      if (!phoneNumber.value) throw new Error('Phone number is empty');

      // Ensure E.164 format (ex: +639xxxxxxxxx for PH)
      confirmationResult.value = await signInWithPhoneNumber(
        auth,
        phoneNumber.value,
        recaptchaVerifier
      );

      return true;
    } catch (err: any) {
      console.error('Error sending code:', err);
      errorMessage.value = err.message || 'Failed to send OTP';

      return false;
    } finally {
      isSending.value = false;

    }

  }

  // Verify OTP
  const verifyCode = async () => {
    errorMessage.value = '';
    isVerifying.value = true;

    try {
      if (!confirmationResult.value) throw new Error('No confirmation result');
      if (!verificationCode.value) throw new Error('Verification code empty');

      const userCredential = await confirmationResult.value.confirm(
        verificationCodeString.value
      );

      console.log('Signed in user:', userCredential.user);
      alert('Phone number verified and user signed in!');

      reset()

      return true;
    } catch (err: any) {
      console.error('Error verifying code:', err);
      errorMessage.value = err.message || 'Failed to verify code';

      return false;
    } finally {
      isVerifying.value = false;
    }
  }

  // Clear the reCAPTCHA widget
  const clearRecaptcha = () => {
    if (recaptchaVerifier && typeof (recaptchaVerifier as any).clear === 'function') {
      try {
        (recaptchaVerifier as any).clear()
        console.log('reCAPTCHA cleared')
      } catch (err) {
        console.warn('Failed to clear reCAPTCHA:', err)
      }
    }
    recaptchaVerifier = null
  }

  // Reset all state
  const reset = () => {
    phoneNumber.value = ''
    verificationCode.value = []
    confirmationResult.value = null
    errorMessage.value = ''
    clearRecaptcha()
  }

  /** ======================
   * RETURNED API
   * ====================== */
  return {
    // state
    phoneNumber,
    verificationCode,
    verificationCodeString,
    confirmationResult,
    recaptchaContainer,
    isSending,
    isVerifying,
    errorMessage,

    // actions
    initRecaptcha,
    sendCode,
    verifyCode,
    clearRecaptcha,
    reset
  }
})


