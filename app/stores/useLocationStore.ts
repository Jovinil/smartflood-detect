import { defineStore } from 'pinia'

// make this a global interface
interface DeviceInfo {
    label: string,
    moduleID: string,
    deviceName: string,
    locationName: string,
    longitude: number,
    latitude: number,
    currentWaterLevel?: number,
    currentWaterLevelStatus?: 'safe' | 'warning' | 'danger',
    deviceStatus: 'active' | 'inactive'
}

interface RequestInfo {
    message: string,
    data: DeviceInfo[]
}

export const useLocationStore = defineStore('location', {
    state: () => ({
        devices: [] as DeviceInfo[]
    }),

    actions: {
        async fetchDevices() {
            try {
                const deviceDatas : RequestInfo = await $fetch('/api/location/')
                this.devices = deviceDatas.data;
            } catch (error) {
                console.error("Error fetching devices", error);
            }
        },
        updateDeviceStore(updatedDevice: DeviceInfo) {
            const index = this.devices.findIndex(device => device.moduleID === updatedDevice.moduleID)

            if (index !== -1) {
                // Replace the whole object
                this.devices[index] = { ...this.devices[index], ...updatedDevice }
            } else {
                console.warn(`Device with moduleID ${updatedDevice.moduleID} not found.`)
            }
        }

    }
})
