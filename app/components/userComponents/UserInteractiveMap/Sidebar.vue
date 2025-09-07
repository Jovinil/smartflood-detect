<template>
    <div class="flex flex-col h-auto md:flex-1 p-4 rounded-md shadow-xl z-50 bg-gray-100 dark:bg-gray-950">

      <div class="mb-5 flex  items-center">
        <div class="flex-1">
          <UInput icon="i-lucide-search" size="md" variant="outline" placeholder="Search device name/ID" class="w-full" />
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
            <div class="flex justify-between">
              <p>Gogon Triangle Device</p>
            </div>

            <div class="flex justify-between">
              <p>Gogon Centro, Virac, Catanduanes</p>
            </div>

            <div class="flex justify-between">
              <p>Active</p>
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
          label="Edit Device Information" 
          color="primary" 
          variant="outline" 
          size="md"
          icon="i-lucide-arrow-right"
          icon-position="trailing"
          @click="enableEdit"
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

const enableEdit = () => {
  mapStore.enableEdit();
}
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

</script>