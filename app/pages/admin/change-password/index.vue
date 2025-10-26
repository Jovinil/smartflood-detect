<template>
  <h1 class="text-2xl font-bold mb-4 text-center">Change Password</h1>
  <UForm :schema="schema" :state="state" class="space-y-4 m-0 md:ms-3" @submit="handleChangePassword">
    <UFormField label="Current Password">
      <UInput
        v-model="state.currPassword"
        placeholder="Password"
        :type="showCurr ? 'text' : 'password'"
        class="w-full"
        :ui="{ trailing: 'pe-1' }"
      >
        <template #trailing>
          <UButton
            color="neutral"
            variant="link"
            size="sm"
            :icon="showCurr ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            :aria-label="showCurr ? 'Hide password' : 'Show password'"
            :aria-pressed="showCurr"
            aria-controls="password"
            @click="showCurr = !showCurr"
          />
        </template>
      </UInput>
    </UFormField>

    <UFormField label="Password">
      <UInput
        v-model="state.tempPassword"
        placeholder="Password"
        :type="showTemp ? 'text' : 'password'"
        class="w-full"
        :ui="{ trailing: 'pe-1' }"
      >
        <template #trailing>
          <UButton
            color="neutral"
            variant="link"
            size="sm"
            :icon="showTemp ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            :aria-label="showTemp ? 'Hide password' : 'Show password'"
            :aria-pressed="showTemp"
            aria-controls="password"
            @click="showTemp = !showTemp"
          />
        </template>
      </UInput>
    </UFormField>

      <UFormField label="Confirm Password">
      <UInput
        v-model="state.finalPassword"
        placeholder="Password"
        :type="showFinal ? 'text' : 'password'"
        class="w-full"
        :ui="{ trailing: 'pe-1' }"
      >
        <template #trailing>
          <UButton
            color="neutral"
            variant="link"
            size="sm"
            :icon="showFinal ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            :aria-label="showFinal ? 'Hide password' : 'Show password'"
            :aria-pressed="showFinal"
            aria-controls="password"
            @click="showFinal = !showFinal"
          />
        </template>
      </UInput>
    </UFormField>

  
    <div class="text-end w-full">
      <UButton type="submit" color="primary" variant="solid" >Save</UButton>
    </div>
  
  </UForm>
</template>

<style scoped>
/* Hide the password reveal button in Edge */
::-ms-reveal {
    display: none;
}
</style>

<script setup lang="ts">
definePageMeta({
  layout: 'login' 
})

import type { FormSubmitEvent } from '@nuxt/ui'
import z from 'zod';

const auht = useAuth();

const showCurr = ref(false);
const showTemp = ref(false);
const showFinal = ref(false);

const currPassword = ref('');
const tempPassword = ref('');
const finalPassword = ref('');

const schema = z.object({
  currPassword: z.string('Invalid password'),
  tempPassword: z.string('Password is required').min(8, 'Must be at least 8 characters'),
  finalPassword: z.string('Password is required').min(8, 'Must be at least 8 characters')
}).refine((data) => data.tempPassword === data.finalPassword, {
  message: "Passwords do not match",
  path: ['finalPassword']
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  currPassword: '',
  tempPassword: '',
  finalPassword: ''  
})

const toast = useToast()
const handleChangePassword = async (event: FormSubmitEvent<Schema>) => {
  console.log('reached')
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  auht.changePassword(state.currPassword!, state.finalPassword!)
  console.log(event.data)
}

</script>