<script setup lang="ts">
import type { Body } from '#components';
import ModalBody from './RegistrationModalMainComponents/ModalBody.vue';
import ModalFooter from './RegistrationModalMainComponents/ModalFooter.vue';

</script>

<template>
  <UModal
    :ui="{
      content: 'h-1/2',
      body: 'flex flex-col gap-2 px-6 py-0',
      header: 'border-0',
    }"
    :close="{
      color: 'primary',
      variant: 'outline',
      class: 'rounded-full'
    }"
  >
    <UButton icon="" label="Register" color="neutral" variant="subtle" class=" hover:text-primary" />

    <template #body>
      <ModalBody />
      
      <ModalFooter />
    </template>
  </UModal>
</template>
