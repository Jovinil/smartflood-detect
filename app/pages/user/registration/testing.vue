
<script setup>
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { ref, onMounted } from 'vue';

const phoneNumber = ref('');
const verificationCode = ref('');
const confirmationResult = ref(null);
const recaptchaContainer = ref(null);
let recaptchaVerifier;

onMounted(() => {
  const auth = getAuth();
  recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainer.value, {
    'size': 'invisible', // Or 'normal' for a visible widget
    'callback': (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
    },
    'expired-callback': () => {
      // reCAPTCHA expired, re-render if needed.
    }
  });
});

const sendCode = async () => {
  const auth = getAuth();
  try {
    confirmationResult.value = await signInWithPhoneNumber(auth, phoneNumber.value, recaptchaVerifier);
    alert('Verification code sent!');
  } catch (error) {
    console.error('Error sending code:', error);
  }
};

const verifyCode = async () => {
  try {
    await confirmationResult.value.confirm(verificationCode.value);
    alert('Phone number verified and user signed in!');
  } catch (error) {
    console.error('Error verifying code:', error);
  }
};
</script>

<template>
  <div>
    <input type="tel" v-model="phoneNumber" placeholder="Enter phone number" />
    <button @click="sendCode">Send Code</button>
    <div ref="recaptchaContainer"></div> <!-- This div is for the reCAPTCHA widget -->

    <template v-if="confirmationResult">
      <input type="text" v-model="verificationCode" placeholder="Enter verification code" />
      <button @click="verifyCode">Verify Code</button>
    </template>
  </div>
</template>