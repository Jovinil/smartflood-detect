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
            @click="modalStore.openModal()"
          />
        </div>
      </template>
      <div class="flex-1">
        <UAccordion 
          v-model="openItem" 
          :collapsible="false" 
          :items="items"
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
              <p class="text-lg">
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
import type { AccordionItem } from '@nuxt/ui';
import { useCurrentUser } from 'vuefire';
import { useModalStore } from '~/app/stores/useModalStore';

const user = useCurrentUser();
const route = useRoute();
const modalStore = useModalStore();

const items = ref<AccordionItem[]>([
  {
    label: 'Green Status / Safe',
    icon: 'i-lucide-smile',
    color: 'text-primary',
    heading: '✅ SAFE STATUS – NO IMMEDIATE THREAT ✅',
    content: 'Current monitoring indicates normal water levels in your area. There is no immediate threat of flooding at this time. Residents may continue normal activities but are encouraged to stay informed through official updates from local authorities.',
  },

  {
    label: 'Orange Status / Warning',
    icon: 'i-lucide-swatch-book',
    color: 'text-orange-500',
    heading: '⚠️ WARNING STATUS – BE ALERT AND PREPARED ⚠️',
    content: 'Rising water levels have been observed in your area. Residents are advised to remain vigilant and prepare for possible evacuation. Secure important belongings, monitor official announcements, and be ready to follow instructions from local authorities.',
  },

  {
    label: 'Red Status / Danger',
    icon: 'i-lucide-box',
    color: 'text-red-500',
    heading: '⚠️ DANGER STATUS – IMMEDIATE ACTION REQUIRED ⚠️',
    content: 'Severe flooding has been detected in your area. Residents are advised to evacuate immediately and proceed to designated evacuation centers. Please follow official instructions from local authorities and emergency services.'
  },

])

const openItem = ref('0') 
const displaybutton = ref(false)

if (route.name  === 'userInteractiveMap') {
  openItem.value = ''
  displaybutton.value = true
}

</script>