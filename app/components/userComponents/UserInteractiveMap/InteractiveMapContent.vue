
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
  <UCard id="map-container" variant="subtle" :ui="{ root: 'flex flex-col h-auto md:flex-2 shadow-xl bg-gray-100 dark:bg-gray-950 relative',  body: 'h-80 md:flex-1 flex', footer: 'text-end  py-2' }">

    <!-- Modal content -->
    <div v-if="modalStore.isModalOpen" class="absolute inset-0 w-full h-full m-0 flex justify-center items-center  bg-elevated/75 px-10" >
      <UCard variant="subtle" :ui="{ root: 'flex flex-col shadow-xl w-full md:w-1/2', body: 'flex items-center justify-center', footer: 'text-end py-2' }">
        <template #header>
          Edit Device Name
        </template>
          <UForm :validate="validate" :state="state" class="flex-1"  @submit="onSubmit">
            <UFormField label="Device Name" name="deviceName">
              <UInput v-model="state.deviceName" class="w-full mb-3" />
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
      Interactive Map
    </template>
    <div class="h-80 md:flex-1 md:h-full flex">
      <!-- <MapboxMap 
            class="flex-1 rounded-sm"
            map-id="<MAP_ID>"
            :options="{
              style: 'mapbox://styles/mapbox/light-v11', // style URL
              center: [-68.137343, 45.137451], // starting position
            
            }"
          >
            <MapboxSource 
              source-id="<MAP_ID>"
              :source="{
                type: 'geojson',
                data: '/test.geojson'
              }"
            />
            <MapboxLayer
              :layer="{
                source: '<MAP_ID>',
                id: 'geojson-layer',
                type: 'fill'
              }"
            />
        <MapboxGeolocateControl position="top-left" />
      </MapboxMap> -->
    </div>

  </UCard>

</template>
