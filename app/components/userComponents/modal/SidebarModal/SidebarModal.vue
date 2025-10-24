<template>
     <div v-if="modalStore.isModalOpen" class="absolute inset-0 w-full h-full m-0 flex justify-center items-center z-50 bg-elevated/75" >

      <div class="absolute top-0 right-0 py-5 px-5">
        <UButton
        @click="modalStore.closeModal()"
        icon="i-lucide-circle-x"
        size="xl"
        color="neutral"
        variant="outline"
        :ui="{
          leadingIcon: 'text-primary',
          base: ''
        }"
        >
        </UButton>
      </div>

      <UCard variant="subtle" :ui="{ root: 'flex flex-col shadow-xl w-full md:w-full mx-5 bg-gray-200 box-shadow dark:bg-gray-950 ', body: 'flex items-center justify-center', footer: 'text-end py-2' }">
        <template #header>
          <span class="text-gray-950 dark:text-gray-200">
            Edit Flood Status Message
          </span>
          
        </template>
        <UForm class="flex-1" :state="tempFloodMessage" @submit="handleMessageUpdate">
            <UInputMenu v-model="tempFloodMessage" :items="floodMessageStore.floodMessages" @update:model-value="modalStore.setTempFLoodMessage(floodMessageStore.floodMessage)" :ui="{ root: 'w-full' }"/>

            <UFormField label="Heading Message" :ui="{ root: 'mt-3 text-md' }"/>
            <UInput v-model="tempFloodMessage.heading" autoresize class="w-full text-md text-gray-950 dark:text-gray-200"  />
            
            <UFormField label="Message Body" :ui="{ root: 'mt-3 text-md' }" />
            <UTextarea v-model="tempFloodMessage.body" autoresize :ui="{ root: 'w-full',}" size="xl" />
        <div class="text-end gap-2 mt-3">
            <UButton type="button" variant="outline" class="me-2" @click="modalStore.discardEdit">
                Cancel
            </UButton>
            <UButton type="submit">
                Save
            </UButton>
        </div>
        
        </UForm>
 
 
      </UCard>
      </div>
</template>

<script setup lang="ts">
import { useModalStore } from '~/app/stores/useModalStore';
import { useFloodMessageStore } from '~/app/stores/useFloodMessageStore';
import type { Form, FormSubmitEvent } from '@nuxt/ui';
import z from 'zod';
import { modal } from '#build/ui';
const floodMessageStore = useFloodMessageStore();
const { floodHeadingMessage, floodMessageBody, floodStatusValue } = storeToRefs(floodMessageStore);
const modalStore = useModalStore();

const tempFloodMessage = computed({
  get: () => floodMessageStore.floodMessage,
  set: (val) => floodMessageStore.setFloodMessage(val)
})

const messageSchema = z.object({
    status: z.literal(['safe', 'warning', 'danger']),
    // status: z.string(),
    heading: z.string(),
    body:z.string()
});

type Schema = z.infer<typeof messageSchema>




const handleMessageUpdate = async (event: FormSubmitEvent<Schema>) => {
  console.log(event.data.status)
  floodMessageStore.updateFloodMessage(event.data.status, event.data.heading,  event.data.body)

  await floodMessageStore.fetchMessages()
  modalStore.closeModal();
}
</script>