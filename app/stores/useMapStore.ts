import { defineStore } from 'pinia'

export const useMapStore = defineStore('map', () => {
    const editEnabled = ref(false);
    const isConfirmed = ref(false);
    const address = ref<string | null>('');
    const position = ref({ lng: '', lat: '' });

    const enableEdit = () =>{
        editEnabled.value = true;
    }

    const disableEdit = () => {
        editEnabled.value = false;
    }

    const discardEdit = () => {
        editEnabled.value = false;
    }

    const saveEdit = () => {
        editEnabled.value = true;
        isConfirmed.value = true
    }

    const setPosition = (lng: string, lat: string) => {
        position.value = {lng: lng, lat: lat}
    }

    return {
        editEnabled,
        isConfirmed,
        address,
        position,

        enableEdit,
        disableEdit,
        discardEdit,
        saveEdit,
        setPosition
    }
})