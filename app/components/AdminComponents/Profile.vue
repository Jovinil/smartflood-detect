<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const items: DropdownMenuItem[] = [
  {
    label: 'Edit Profile',
    icon: 'i-lucide-users'
  },
  {
    label: 'Records',
    icon: 'i-lucide-mail',
    to: '/admin/records'
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

