// stores/modal.js
import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
    state: () => ({
        isModalOpen: false,
        isConfirmed: false
    }),
    actions: {
        openModal() {
            this.isModalOpen = true;
        },
        closeModal(){
            this.isModalOpen = false;
        },
        saveEdit(){
            this.isConfirmed = true;
        },
        discardEdit(){
            this.isModalOpen = false;
            this.isConfirmed = false;
            console.log('test')
        }
    },
});