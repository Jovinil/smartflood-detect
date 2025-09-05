
<script setup lang="ts">
  import { useModalStore } from '~/app/stores/modal';
  import type { FormError, FormSubmitEvent } from '@nuxt/ui'

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
  <UCard  variant="subtle" :ui="{ root: 'flex flex-col h-auto md:flex-2 shadow-xl bg-gray-100 dark:bg-gray-950 relative',  body: 'h-80 md:flex-1 flex', footer: 'text-end  py-2' }">

    <!-- Modal content -->
    <div v-if="modalStore.isModalOpen" class="absolute inset-0 w-full h-full m-0 flex justify-center items-center z-50 bg-elevated/75 px-10" >

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
      <div class="flex justify-between items-center">
        <span>Interactive Map</span>
        <div class="text-center"><ThemeToggle /></div>
        
      </div>
    </template>
    <div class="h-80 md:flex-1 md:h-full flex bg-primary relative">
      <div class="absolute right-0 bottom-0 pe-15 pb-12 z-50"> 
          <UButton  
            icon="i-lucide-plus" 
            variant="outline"
          />
      </div>
      <Mapbox />
    </div>

  </UCard>

</template>
