// stores/modal.js
import { defineStore } from 'pinia';
import { useFloodMessageStore } from './useFloodMessageStore';

export const useModalStore = defineStore('modal', () => {
    
    const isModalOpen = ref(false);
    const isConfirmed = ref(false);
    const floodMessageStore = useFloodMessageStore();
    let tempFloodMessage : any;

    
    const openModal = (floodMessage : object)  => {
            isModalOpen.value = true;
            tempFloodMessage = JSON.parse(JSON.stringify(floodMessage))
    }

    const setTempFLoodMessage = (floodMessage : object) => {
        tempFloodMessage = JSON.parse(JSON.stringify(floodMessage));
    }

    const closeModal = () => {
            isModalOpen.value = false;
    }
    const saveEdit = () => {
            isConfirmed.value = true;
    }
    const discardEdit = ()  => {
            isModalOpen.value = false;
            isConfirmed.value = false;
            console.log(tempFloodMessage)
            floodMessageStore.setFloodMessage(JSON.parse(JSON.stringify(tempFloodMessage)))
            console.log(floodMessageStore.floodMessages);
    }
    
    return {
        isModalOpen,
        isConfirmed,

        openModal,
        closeModal,
        saveEdit,
        discardEdit,
        setTempFLoodMessage,
    }
})