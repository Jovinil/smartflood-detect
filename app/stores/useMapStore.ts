import { defineStore } from 'pinia'

interface PositionInfo {
    lng: number | null,
    lat: number | null
}

export const useMapStore = defineStore('map', () => {
    const editEnabled = ref(false);
    const isConfirmed = ref(false);
    const address = ref<string | null>('');
    const position = ref<PositionInfo>({ lng: null, lat: null });

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
        editEnabled.value = !editEnabled.value;
        isConfirmed.value = true
    }

    const setPosition = (lng: number, lat: number) => {
        position.value = {lng, lat}
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