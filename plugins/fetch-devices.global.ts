import { useLocationStore } from '~/app/stores/useLocationStore';

export default defineNuxtPlugin(async () => {
  const locationStore = useLocationStore();
  await locationStore.fetchDevices();
})
