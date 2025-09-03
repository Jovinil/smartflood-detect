<template>
    <div class="flex flex-col h-auto md:flex-1 p-4 rounded-md shadow-xl bg-gray-100 dark:bg-gray-950">
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
          <div class="flex justify-between">
            <p>Gogon Triangle Device</p>



            <UButton 
              color="primary"   
              icon="i-lucide-edit"
              @click="modalStore.toggleModal()" 
              variant="outline">
              Edit
            </UButton>
          </div>
          <div>
            <p>Gogon Centro, Virac, Catanduanes</p>
          </div>
          <div>
            <p>Active</p>
          </div>
        </template>
      </UCollapsible>


  

      <!-- <UCollapsible v-model:open="openTwo" class="flex flex-col gap-2 w-full" 
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
          <div>
            <p>The water level is 200cm</p>
          </div>
          <div>
            <p>Date(MM-DD-YY) / time</p>
          </div>
          <div>
            <p>Status Level(Danger)</p>
          </div>
        </template>
      </UCollapsible> -->
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
 import { useModalStore } from '~/app/stores/modal';

  const modalStore = useModalStore();
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