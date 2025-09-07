
<script setup lang="ts">
  import { useModalStore } from '~/app/stores/modal';
  import type { FormError, FormSubmitEvent } from '@nuxt/ui';
  import { useMapStore } from '~/app/stores/useMapStore';

  const modalStore = useModalStore();
  const mapStore = useMapStore();

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
  <UCard  variant="subtle" 
  :ui="
  { 
    root: 'flex flex-col h-auto md:flex-3 shadow-xl bg-gray-100 dark:bg-gray-950 relative md:rounded-none', 
    body: 'h-full w-full p-0 md:flex-1 flex sm:p-0',
  }">

    <div v-if="modalStore.isModalOpen" class="absolute inset-0 w-full h-full m-0 flex justify-center items-center z-50 bg-elevated/75" >

      <div class="absolute top-0 right-0 py-5 px-5">
        <UButton
        @click="modalStore.toggleModal()"
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

    <div class="h-80 w-full md:flex-1 md:h-full flex relative sm:p-0">
      <div class="absolute top-2 left-2 md:top-4 md:left-4 z-10">
        <UButton  
          icon="i-lucide-arrow-left" 
          size="xl"
          variant="solid"
          to="/"
        />
      </div>
      <div ref="geocoderContainer" class="absolute top-2 right-2 md:px-4 md:py-4 md:right-2 w-2/3 md:w-120  z-10"></div>

      <div class="absolute right-0 bottom-0 pe-15 pb-12 z-10"> 
          <UButton  
            icon="i-lucide-plus" 
            size="xl"
            variant="solid"
          />

          <div class="flex gap-2">
            <UButton 
              size="xl"
              label="Cancel"
              color="neutral"
              variant="subtle"
              class="mt-2"
            />
             <UButton  
              size="xl"
              label="Save"
              variant="solid"
              class="mt-2"
              @click="mapStore.disableEdit()"
            />
          </div>
    
        
      </div>
      <Mapbox />
    </div>

  </UCard>

</template>
