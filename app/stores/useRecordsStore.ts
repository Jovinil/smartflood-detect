import { defineStore } from 'pinia'

export const useRecordsStore = defineStore('records', {
    state: () => ({
        seePrevious: false
    }),

    actions: {
        visibleContainer() {
            this.seePrevious = true;
        },
    }
})
