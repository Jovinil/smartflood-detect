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
    <UButton icon="" label="Register" color="primary" variant="solid" class="" />

    <template #body>
      <ModalBody />
      
      <ModalFooter />
    </template>
  </UModal>
</template>
