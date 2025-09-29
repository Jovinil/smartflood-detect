import { defineStore } from 'pinia'
import { useLocationStore } from '~/app/stores/useLocationStore'

interface PositionInfo {
    lng: number | null,
    lat: number | null
}

export const useMapStore = defineStore('map', () => {
    const useLocation = useLocationStore();

    const editEnabled = ref(false);
    const isDeviceSelected = ref(false);
    const isCancelled = ref(false);
    const isConfirmed = ref(false);
    const address = ref<string | null>('');
    const position = ref<PositionInfo>({ lng: null, lat: null });
    const selectedDevice = ref<any | null>(null)

    const enableEdit = (device: any) =>{
        editEnabled.value = true;

        selectedDevice.value = device;
    }

    const disableEdit = () => {
        editEnabled.value = false;
    }

    const discardEdit = () => {
        editEnabled.value = false;
        isCancelled.value = true;
    }

    const saveEdit = () => {
        editEnabled.value = false;
        isConfirmed.value = true
    }

    const setPosition = (lng: number, lat: number) => {
        position.value = {lng, lat}
    }

    const handleDeviceSelect = async (device: any) => {
        isDeviceSelected.value = true
        selectedDevice.value = device
    }

    const deviceCoordinates = computed(() =>
    useLocation.devices
      .filter(device => device.longitude !== null && device.latitude !== null)
      .map(device => ({
        moduleID: device.moduleID,
        name: device.deviceName,
        lng: device.longitude,
        lat: device.latitude,
      }))
    )

    function getCoordinates(moduleID: string) {
        const device = useLocation.devices.find(d => d.moduleID === moduleID)
        return device ? { lng: device.longitude, lat: device.latitude } : null
    }

    return {
        editEnabled,
        isDeviceSelected,
        isCancelled,
        isConfirmed,
        address,
        position,
        selectedDevice,

        enableEdit,
        disableEdit,
        discardEdit,
        saveEdit,
        setPosition,
        handleDeviceSelect,
        deviceCoordinates,
        getCoordinates
    }
})