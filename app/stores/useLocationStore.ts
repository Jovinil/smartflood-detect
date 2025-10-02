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
        devices: [] as DeviceInfo[],
        device: undefined as unknown as DeviceInfo,
        loaded: false
    }),

    actions: {
        // async fetchDevices() {
        //     try {
        //         const deviceDatas : RequestInfo = await $fetch('/api/location/')
        //         this.devices = deviceDatas.data;
        //     } catch (error) {
        //         console.error("Error fetching devices", error);
        //     }
        // },
        async fetchDevicesLazy(force = false) {
            if (this.loaded && !force) return // prevent re-fetch unless forced
            
            try {
                const deviceDatas: RequestInfo = await $fetch('/api/location/')
                this.devices = deviceDatas.data
                this.loaded = true
            } catch (err) {
                console.error('Error fetching devices:', err)
            }
        },
        setDevice(newDevice: DeviceInfo){
            this.device = newDevice
        },        
        updateDeviceStore(updatedDevice: DeviceInfo) {
            const index = this.devices.findIndex(device => device.moduleID === updatedDevice.moduleID)

            if (index !== -1) {
                //Replace the whole object
                this.devices[index] = { ...this.devices[index], ...toRaw(updatedDevice) }
            } else {
                console.warn(`Device with moduleID ${updatedDevice.moduleID} not found.`)
            }
        }
        
    }
})
