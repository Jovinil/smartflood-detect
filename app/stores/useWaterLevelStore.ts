import { defineStore } from 'pinia'

// make this a global interface
interface LogInfo {
    id: string,
    waterLevel: number,
    createdAt: string
}

// interface RequestInfo {
//     data: LogInfo[]
// }

export const useWaterLevelStore = defineStore('waterLevel', {
    state: () => ({
        waterLevelLogs: [] as LogInfo[]
    }),

    actions: {
        async fetchWaterLevelLogs() {
            try {
                const request: LogInfo[] = await $fetch('/api/location/log')
                this.waterLevelLogs = request
            } catch (err) {
                console.error('Error fetching devices:', err)
            }
        }
    }
})
