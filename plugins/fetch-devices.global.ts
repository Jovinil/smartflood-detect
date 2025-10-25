import { useFloodMessageStore } from '~/app/stores/useFloodMessageStore';
import { useLocationStore } from '~/app/stores/useLocationStore';
import { useRecordsStore } from '~/app/stores/useRecordsStore';

export default defineNuxtPlugin(async () => {
  const locationStore = useLocationStore();
  const floodMessageStore = useFloodMessageStore();
  const recordsStore = useRecordsStore();
  await locationStore.fetchDevicesLazy();
  await floodMessageStore.fetchMessages();
  await recordsStore.fetchActionLogs();
  floodMessageStore.setFloodMessage(floodMessageStore.floodMessages[0])
  locationStore.setDevice(locationStore.devices[0])
})
