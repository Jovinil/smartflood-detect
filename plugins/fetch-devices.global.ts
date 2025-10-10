import { useFloodMessageStore } from '~/app/stores/useFloodMessageStore';
import { useLocationStore } from '~/app/stores/useLocationStore';

export default defineNuxtPlugin(async () => {
  const locationStore = useLocationStore();
  const floodMessageStore = useFloodMessageStore();
  await locationStore.fetchDevicesLazy();
  await floodMessageStore.fetchMessages();
  floodMessageStore.setFloodMessage(floodMessageStore.floodMessages[0])
  locationStore.setDevice(locationStore.devices[0])
})
