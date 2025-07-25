<template>
  <div>
    <BaseModal />
    <AppHeader />
    <slot />
  </div>
</template>


<script setup>
import Modal from '~/app/components/userComponents/modal/BaseModal.vue'
</script>