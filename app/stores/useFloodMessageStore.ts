import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFloodMessageStore = defineStore('floodMessage', () => {
  /** ======================
   * STATE
   * ====================== */

  const floodMessages = ref([
    {
      status: 'Green Status / Safe',
      heading: '✅ SAFE STATUS – NO IMMEDIATE THREAT ✅',
      body: 'Current monitoring indicates normal water levels in your area. There is no immediate threat of flooding at this time. Residents may continue normal activities but are encouraged to stay informed through official updates from local authorities.'
    },
    {
      status: 'Orange Status / Warning',
      heading: '⚠️ WARNING STATUS – BE ALERT AND PREPARED ⚠️',
      body: 'Rising water levels have been observed in your area. Residents are advised to remain vigilant and prepare for possible evacuation. Secure important belongings, monitor official announcements, and be ready to follow instructions from local authorities.'
    },
    {
      status: 'Red Status / Danger',
      heading: '⚠️ DANGER STATUS – IMMEDIATE ACTION REQUIRED ⚠️',
      body: 'Severe flooding has been detected in your area. Residents are advised to evacuate immediately and proceed to designated evacuation centers. Please follow official instructions from local authorities and emergency services.'
    }
  ])

  // List of statuses for selection
  const floodStatusItems = ref(floodMessages.value.map(msg => msg.status))

  // Currently selected status
  const floodStatusValue = ref(floodStatusItems.value[0] || null)

  // Computed: find the selected message by status
  const selectedFloodMessage = computed(() =>
    floodMessages.value.find(msg => msg.status === floodStatusValue.value) || null
  )

  // Heading & body based on selection
  const floodHeadingMessage = computed(() => selectedFloodMessage.value?.heading || '')
  const floodMessageBody = computed(() => selectedFloodMessage.value?.body || '')


  return {
    // state
    floodMessages,
    floodStatusItems,
    floodStatusValue,
    selectedFloodMessage,
    floodHeadingMessage,
    floodMessageBody,

    // actions

  }
})


