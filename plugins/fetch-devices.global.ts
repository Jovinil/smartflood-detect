import { useFloodMessageStore } from '~/app/stores/useFloodMessageStore';
import { useLocationStore } from '~/app/stores/useLocationStore';

export default defineNuxtPlugin(async () => {
  const locationStore = useLocationStore();
  await locationStore.fetchDevicesLazy();
  locationStore.setDevice(locationStore.devices[0])
  const floodMessageStore = useFloodMessageStore();
  await floodMessageStore.fetchMessages();
})
