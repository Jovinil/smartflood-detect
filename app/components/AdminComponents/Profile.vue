<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const items: DropdownMenuItem[] = [
  {
    label: 'Edit Profile',
    icon: 'i-lucide-users'
  },
  {
    label: 'Logout',
    icon: 'i-lucide-log-out'
  },
]
</script>

<template>
  <UButtonGroup>
    <UButton color="neutral" variant="subtle" label="Admin" />

    <UDropdownMenu :items="items">
      <UButton
        color="neutral"
        variant="outline"
        icon="i-lucide-chevron-down"
      />
    </UDropdownMenu>
  </UButtonGroup>
</template>

