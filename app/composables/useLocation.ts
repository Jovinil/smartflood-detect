import {ref as dbRef, getDatabase, off, onValue } from "firebase/database";

export const useLocationStore = defineStore('location', () => {
    const db = getDatabase();

    const waterLevel = ref<any | null>(null);
    const status = ref<any | null>(null);
    const isLoading = ref(true);

    const startListening = (moduleID: string) => {
        isLoading.value = true;

        const waterLevelRef = dbRef(db, `locations/${moduleID}/currentWaterLevel`);
        waterLevel.value = useDatabaseObject(waterLevelRef);
        const statusRef = dbRef(db, `locations/${moduleID}/status`);
        status.value = useDatabaseObject(statusRef);

        isLoading.value = false;
    }

    const stopListening = () => {
        waterLevel.value = null,
        status.value = null
    }

    return {
        waterLevel,
        status,
        isLoading,
        startListening,
        stopListening
    };


})