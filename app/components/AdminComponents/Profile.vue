<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const items: DropdownMenuItem[] = [
  {
    label: 'Change Password',
    icon: 'i-lucide-users',
    to: '/admin/change-password'
  },
  {
    label: 'Records',
    icon: 'i-lucide-archive',
    to: '/admin/records'
  },
  {
    label: 'History',
    icon: 'i-lucide-scroll-text',
    to: '/admin/history'
  },
  {
    label: 'Logout',
    icon: 'i-lucide-log-out',
    to: '/admin/logout'
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

