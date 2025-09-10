import { defineStore } from 'pinia'

export const useMapStore = defineStore('map', {
    state: () => ({
        editEnabled: false,
    }),
    actions: {
        enableEdit(){
            this.editEnabled = true;
        },
        disableEdit(){
            this.editEnabled = false;
        },
         toggleEdit() {
            this.editEnabled = !this.editEnabled
        }
    }
})