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
      <UTabs :items="[
        { label: 'QR Code Scan', slot: 'qr' },
        { label: 'Link Button', slot: 'link' },
      ]"
      :ui="{
        root: 'flex-col-reverse h-full',
        content: 'h-full flex justify-center align-center'
      }">
        <template #qr>
          <div class="flex-1 flex flex-col gap-2 items-center justify-center px-6">
              <QRCode/>
          </div>
        </template>

        <template #link>
          <div class="flex-1 flex flex-col gap-2 items-center justify-center px-6 py-3">
            <OpenLink/>
          </div>
        </template>
      </UTabs>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

</script>