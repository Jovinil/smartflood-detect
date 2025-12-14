import { defineStore } from 'pinia'

// make this a global interface
interface LogInfo {
  id: string
  waterLevel: number
  createdAt: string
}

// ✅ params type for your updated endpoint
type FetchLogsParams = {
  moduleId?: string
  month?: number
  week?: number
  year?: number
}

export const useWaterLevelStore = defineStore('waterLevel', {
  state: () => ({
    waterLevelLogs: [] as LogInfo[],
  }),

  actions: {
    // ✅ now accepts optional filters
    async fetchWaterLevelLogs(params?: FetchLogsParams) {
      try {
        const request: LogInfo[] = await $fetch('/api/location/log', {
          params: params ?? {}, // if undefined, endpoint will do the usual behavior
        })
        this.waterLevelLogs = request
      } catch (err) {
        console.error('Error fetching logs:', err)
      }
    },
  },
})
