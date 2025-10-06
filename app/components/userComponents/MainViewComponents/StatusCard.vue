<template>
   <UCard variant="subtle" :ui="{  root: 'w-full flex flex-col shadow-xl overflow-y-auto', header: '', body: 'flex-1 flex flex-col' }">
      <template #header>
        
        <div class="flex items-center justify-between">
          <p>Flood Status</p>
          
          <UButton
            v-if="displaybutton && user"
            label="Edit Flood Status Message"
            color="neutral"
            variant="outline"
            @click="modalStore.openModal(floodMessageStore.floodMessage)"
          />
        </div>
      </template>
      <div class="flex-1">
        <UAccordion 
          v-model="openItem" 
          :collapsible="false" 
          :items="floodMessageAccordionItems"
        >
          <div>
            
          </div>
          <template #leading="{ item }">
            <p
              :class="[
                'text-sm font-semibold',
                item.color
              ]"
            >
              {{ item.label }}
            </p>
          </template>


          <template #content="{ item }">
            <div class="flex-1 flex flex-col min-h-0">
              <p class="text-md">
                {{ item.heading }}
              </p>
              <p class="my-3">
                {{ item.content }}
              </p>
             
            </div>
          </template>
        </UAccordion>
      </div>
    </UCard>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { AccordionItem } from '@nuxt/ui'
import { useCurrentUser } from 'vuefire'
import { useRoute } from '#imports'
import { useModalStore } from '~/app/stores/useModalStore'
import { useFloodMessageStore } from '~/app/stores/useFloodMessageStore'

const user = useCurrentUser()
const route = useRoute()
const modalStore = useModalStore()
const floodMessageStore = useFloodMessageStore()

// Map store messages into UAccordion item format
const floodMessageAccordionItems = computed<AccordionItem[]>(() =>
  floodMessageStore.floodMessages.map(msg => {
    let color = ''
    // if (msg.status.includes('Green')) color = 'text-primary'
    // if (msg.status.includes('Orange')) color = 'text-orange-500'
    // if (msg.status.includes('Red')) color = 'text-red-500'
    if (msg.id === 0) color =  'text-primary'
    if (msg.id === 1) color = 'text-orange-500'
    if (msg.id === 2) color = 'text-red-500'
    return {
      label: msg.status,
      icon: '', // optional, you can map different icons per status
      color,
      heading: msg.heading,
      content: msg.body,
    }
  })
)

const openItem = ref('0')
const displaybutton = ref(false)

if (route.name === 'userInteractiveMap') {
  openItem.value = ''
  displaybutton.value = true
}


</script>