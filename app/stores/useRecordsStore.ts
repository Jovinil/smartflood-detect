import { defineStore } from 'pinia'

interface RequestInfo {
    message: string,
    data: LogsRow[]
}

type Message = {
  id: string,
  category: 'message',
  logType: string,
  before: {
    heading: string,
    message: string
  },
  after: {
    heading: string,
    message: string
  },
  createdAt: string
}

type Device = {
  id: string,
  category: 'location',
  logType: string,
  before: {
    deviceName: string,
    deviceStatus: 'active' | 'inactive',
    locationName: string,
    longitude: number,
    latitude: number
  },
  after: {
    deviceName: string,
    deviceStatus: 'active' | 'inactive',
    locationName: string,
    longitude: number,
    latitude: number
  },
  createdAt: string
}

type LogsRow = Device | Message;

export const useRecordsStore = defineStore('records', {
    state: () => ({
        seePrevious: false,
        actionLogs: [] as LogsRow[]
    }),

    actions: {
        visibleContainer() {
            this.seePrevious = !this.seePrevious;
        },

        async fetchActionLogs() {            
            try {
                const request : RequestInfo = await $fetch('/api/actionLog')
                this.actionLogs = request.data
            } catch (err) {
                console.error('Error fetching devices:', err)
            }
        }
    }
})
