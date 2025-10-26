import { useFloodMessageStore } from '~/app/stores/useFloodMessageStore';
import { useLocationStore } from '~/app/stores/useLocationStore';
import { useRecordsStore } from '~/app/stores/useRecordsStore';
import { useWaterLevelStore } from '~/app/stores/useWaterLevelStore';

export default defineNuxtPlugin(async () => {
  const locationStore = useLocationStore();
  const floodMessageStore = useFloodMessageStore();
  const recordsStore = useRecordsStore();
  const waterLevelLogsStore = useWaterLevelStore();
  await locationStore.fetchDevicesLazy();
  await floodMessageStore.fetchMessages();
  await recordsStore.fetchActionLogs();
  await waterLevelLogsStore.fetchWaterLevelLogs();
  floodMessageStore.setFloodMessage(floodMessageStore.floodMessages[0])
  locationStore.setDevice(locationStore.devices[0])
})
