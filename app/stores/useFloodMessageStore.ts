import { defineStore } from 'pinia'
import { ref } from 'vue'
import z from 'zod';

interface FloodMessageInfo {
  id: number,
  label: string,
  status: string,
  heading: string,
  body: string
}

interface RequestInfo {
  message: string,
  data: FloodMessageInfo[]
}

const messageSchema = z.object({
    status: z.literal(['safe', 'warning', 'danger']),
    heading: z.string(),
    message:z.string()
});

export const useFloodMessageStore = defineStore('floodMessage', () => {
  /** ======================
   * STATE
   * ====================== */

  const floodMessages = ref([
    {
      id: 0,
      label: 'Green Status / Safe',
      status: 'Green Status / Safe',
      heading: '✅ SAFE STATUS – NO IMMEDIATE THREAT ✅',
      body: 'Current monitoring indicates normal water levels in your area. There is no immediate threat of flooding at this time. Residents may continue normal activities but are encouraged to stay informed through official updates from local authorities.'
    },
    {
      id: 1,
      label: 'Orange Status / Warning',
      status: 'Orange Status / Warning',
      heading: '⚠️ WARNING STATUS – BE ALERT AND PREPARED ⚠️',
      body: 'Rising water levels have been observed in your area. Residents are advised to remain vigilant and prepare for possible evacuation. Secure important belongings, monitor official announcements, and be ready to follow instructions from local authorities.'
    },
    {
      id: 2,
      label: 'Red Status / Danger',
      status: 'Red Status / Danger',
      heading: '⚠️ DANGER STATUS – IMMEDIATE ACTION REQUIRED ⚠️',
      body: 'Severe flooding has been detected in your area. Residents are advised to evacuate immediately and proceed to designated evacuation centers. Please follow official instructions from local authorities and emergency services.'
    }
  ])
  const floodMessage = ref()

  // List of statuses for selection
  const floodStatusItems = ref(floodMessages.value.map(msg => {
    const temp = msg.status.toString().split(" ")
    // console.log(temp[temp.length - 1].toLowerCase().trim())

    return {
      label: msg.status,
      value: msg.status
      // value: temp[temp.length - 1].toLowerCase().trim()
    }
  }))

  // Currently selected status
  const floodStatusValue = ref(floodStatusItems.value[0].label || null)

  // Computed: find the selected message by status
  const selectedFloodMessage = computed(() =>
    floodMessages.value.find(msg => msg.status === floodStatusValue.value) || null
  )

  const fetchMessages = async () => {
    try{
      const messageDatas : RequestInfo= await $fetch('/api/message')
      messageDatas.data.forEach((message) => {
        floodMessages.value[message.id].status = message.status
        floodMessages.value[message.id].heading = message.heading
        floodMessages.value[message.id].body = message.body
      });
    }catch(error){
      console.log(`igwa error ${error}`)
    }
  }

  const saveEdit = (status: string, newHeading: string, newMessage: string) => {
    console.log(status)
    console.log(floodStatusValue.value)
    const temp = floodMessages.value.find(msg => status === floodStatusValue.value)
    temp!.body = newMessage;
    temp!.heading = newHeading;
  }

  // Heading & body based on selection
const floodHeadingMessage = computed({
  get: () => selectedFloodMessage.value?.heading || '',
  set: (val: string) => {
    if (selectedFloodMessage.value) {
      selectedFloodMessage.value.heading = val
    }
  }
})

const floodMessageBody = computed({
  get: () => selectedFloodMessage.value?.body || '',
  set: (val: string) => {
    if (selectedFloodMessage.value) {
      selectedFloodMessage.value.body = val
      
    }
  }
})

const setFloodMessage = (newFloodMessage: FloodMessageInfo) => {
  console.log("called")
  floodMessage.value = JSON.parse(JSON.stringify(newFloodMessage));
}

const updateFloodMessage = async (status: string, heading: string, message: string) => {
  console.log(message)
        const tempStatus = status.toString().split(" ");
        const temp = tempStatus[tempStatus.length - 1].toLowerCase().trim();
        console.log(temp)
        const validated = messageSchema.safeParse({status: temp, heading, message}, {
            reportInput: true
        });
        
        if(!validated.success){            
            console.error(validated.error.issues);
            return;
        }

        try{
            // locationStore.updateDeviceStore(validated.data);
            const request = await $fetch('/api/message/update', {
            method: 'POST',
            body: validated.data
        });
        }catch(error){
            console.error(`An error occured when updating device ${error}`);
        }
}

  return {
    // state
    floodMessages,
    floodStatusItems,
    floodStatusValue,
    selectedFloodMessage,
    floodHeadingMessage,
    floodMessageBody,
    floodMessage,
    
    // actions
    saveEdit,
    fetchMessages,
    updateFloodMessage,
    setFloodMessage

  }
})


