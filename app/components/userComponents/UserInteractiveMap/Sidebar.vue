<template>
    <div class="flex flex-col h-auto md:flex-1 p-4 rounded-md shadow-xl z-50 bg-gray-100 dark:bg-gray-950">

      <div class="mb-5 flex  items-center">
        <div class="flex-1">
          <UInputMenu 
            icon="i-lucide-search"
            color="neutral"
            variant="outline"
            v-model="deviceValue" 
            value-key="id" 
            :items="deviceList" 
          />
        </div>
        
        <div>
          <DarkModeToggle />
        </div>
      </div>


      <UCollapsible v-model:open="openOne" class="flex flex-col gap-2 w-full mb-3" 
      :ui="{
        content: 'bg-gray-200 dark:bg-gray-700 rounded-sm px-3 py-2'
      }">
        <UButton
          label="Device Information"
          color="primary"
          variant="subtle"
          trailing-icon="i-lucide-chevron-down"
          block
        />

        <template #content>
          <div class="flex flex-col gap-2">
            <div>
               <p v-if="!mapStore.editEnabled">Gogon Triangle Device</p>

              <UInput 
                v-else
                v-model="deviceValue"
                color="neutral" 
                variant="outline" 
                placeholder="Device Name"
                class="w-full" 
              />
            </div>

            <div>
              <div class="flex flex-col" v-if="!mapStore.editEnabled">
                <p>Gogon Centro, Virac, Catanduanes</p>
                <p>(lng: 123123, lat: 2131231)</p>
              </div>
           
              <UInput 
                v-else
                color="neutral"
                variant="outline"
                disabled 
                placeholder="Double click on the map to set / Drag the pin" 
                class="w-full"
                />
            </div>

            <div>
              <p v-if="!mapStore.editEnabled">Active</p>

              <UInputMenu 
                v-else
                color="neutral"
                variant="outline"
                v-model="value" 
                value-key="id" 
                :items="items" 
              />
            </div>
          </div>

        </template>
      </UCollapsible>

    

      <UCollapsible v-model:open="openTwo" class="flex flex-col gap-2 w-full" 
      :ui="{

        content: 'bg-gray-200 dark:bg-gray-700 rounded-sm px-3 py-2'
      }">
        <UButton
          label="Environmental Data"
          color="primary"
          variant="subtle"
          trailing-icon="i-lucide-chevron-down"
          block
        />


        <template #content>
          <div class="flex flex-col gap-2">
            <div>
              <p>The water level is 200cm</p>
            </div>
            <div>
              <p>Date(MM-DD-YY) / time</p>
            </div>

            <div class="flex justify-between">
                <p>Status Level(Danger)</p>
                
                <!-- implement an user auth that recognizes whether user is admin -->
                <!-- <UButton 
                  color="primary"   
                  icon="i-lucide-edit"
                  @click="modalStore.toggleModal()" 
                  variant="outline">
                  Edit
                </UButton> -->
            </div>
          </div>
           
         
         
        </template>
      </UCollapsible>

      <div class="self-end mt-3 md:mt-auto">
        <UButton 
          :label="mapStore.editEnabled ? 'Save Changes' : 'Edit Device Information'"
          color="primary" 
          variant="outline" 
          size="md"
          icon="i-lucide-arrow-right"
          icon-position="trailing"
          @click="mapStore.toggleEdit"
          />

      </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useModalStore } from '~/app/stores/modal';
import { useMapStore } from '~/app/stores/useMapStore';

const modalStore = useModalStore();
const mapStore = useMapStore();

// import { defineShortcuts } from 'path-to-utils' // or auto-import

const openOne = ref(true)
const openTwo = ref(true)

defineShortcuts({
  o: () => {
    openOne.value = !openOne.value
  },
  p: () => {
    openTwo.value = !openTwo.value
  }
})

// place JSON shit here
const items = ref([
  {
    label: 'Active',
    id: 'active'
  },
  {
    label: 'Inactive',
    id: 'inactive'
  },
])
const value = ref('Active');

const deviceList = ref([
  {
    label: 'device 1',
    id: 'dev1'
  },
  {
    label: 'device 2',
    id: 'dev2'
  },
])
const deviceValue = ref('device 1');
</script>