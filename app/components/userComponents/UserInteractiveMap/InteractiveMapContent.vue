
<script setup lang="ts">
  import { useModalStore } from '~/app/stores/modal';
  import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import { Map } from 'mapbox-gl';

  const modalStore = useModalStore();

  const state = reactive({
    deviceName: undefined,
  })

  const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.deviceName) errors.push({ name: 'deviceName', message: 'Required' })
  return errors
  }

  const toast = useToast()
  async function onSubmit(event: FormSubmitEvent<typeof state>) {
    toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
    console.log(event.data)
  }
</script>

<template>
  <UCard  variant="subtle" :ui="{ root: 'flex flex-col h-auto md:flex-3 shadow-xl bg-gray-100 dark:bg-gray-950 relative md:rounded-none', header: 'md:hidden',  body: 'h-full w-full md:flex-1 flex md:p-0', footer: 'text-end' }">

    <div v-if="modalStore.isModalOpen" class="absolute inset-0 w-full h-full m-0 flex justify-center items-center z-50 bg-elevated/75" >

      <div class="absolute top-0 right-0 py-5 px-5">
        <UButton
        @click="modalStore.toggleModal()"
        icon="i-lucide-circle-x"
        color="neutral"
        variant="outline"
        :ui="{
          leadingIcon: 'text-primary',
          base: ''
        }"
        >
        </UButton>
      </div>

      <UCard variant="subtle" :ui="{ root: 'flex flex-col shadow-xl w-full md:w-1/2 bg-gray-200 box-shadow dark:bg-gray-950', body: 'flex items-center justify-center', footer: 'text-end py-2' }">
        <template #header>
          <span class="text-gray-950 dark:text-gray-200">
            Edit Device Name
          </span>
          
        </template>
          <UForm :validate="validate" :state="state" class="flex-1"  @submit="onSubmit">
            <UFormField  label="Device Name" name="deviceName">
              <UInput v-model="state.deviceName" class="w-full mb-3  text-gray-950 dark:text-gray-200" />
            </UFormField>

            <div class="text-end">
            <UButton type="submit">
                Submit
            </UButton>
            </div>
           
          </UForm>
 
      </UCard>
    </div>

    
    <template #header>
      <div class="flex justify-between items-center md:hidden md:p-0">
        <span>Interactive Map</span>
        <div class="text-center"><ThemeToggle /></div>
        
      </div>
    </template>
    <div class="h-80 w-full md:flex-1 md:h-full flex relative md:p-0">
      <div class="absolute right-0 bottom-0 pe-15 pb-12 z-10"> 
          <UButton  
            icon="i-lucide-plus" 
            variant="solid"
          />
      </div>
      <Mapbox />
    </div>

  </UCard>

</template>
