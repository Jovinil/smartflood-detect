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
        <UForm class="flex-1">
            <UInputMenu v-model="floodMessageStore.floodStatusValue" :items="floodMessageStore.floodStatusItems" :ui="{ root: 'w-full' }"/>

            <UFormField label="Heading Message" :ui="{ root: 'mt-3 text-md' }"/>
            <UInput v-model="floodMessageStore.floodHeadingMessage" autoresize class="w-full text-md text-gray-950 dark:text-gray-200"  />
            
            <UFormField label="Message Body" :ui="{ root: 'mt-3 text-md' }" />
            <UTextarea v-model="floodMessageStore.floodMessageBody" autoresize :ui="{ root: 'w-full',}" size="xl" />
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

const modalStore = useModalStore();
const floodMessageStore = useFloodMessageStore();
</script>