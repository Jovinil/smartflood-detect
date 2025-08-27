// stores/modal.js
import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
    state: () => ({
        isModalOpen: false,
    }),
    actions: {
        toggleModal() {
            this.isModalOpen = !this.isModalOpen;
        }
    },
});