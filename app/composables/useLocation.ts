import {ref as dbRef, getDatabase, off, onValue } from "firebase/database";
import z from "zod";
import { useLocationStore } from "../stores/useLocationStore";
import { useMapStore } from "../stores/useMapStore";

const deviceSchema = z.object({
    moduleID: z.string(),
    deviceName: z.string(),
    locationName: z.string(),
    longitude: z.number(),
    latitude: z.number(),
    deviceStatus: z.literal(['active', 'inactive'])
})

export const useLocation = () => {
    const db = getDatabase();
    const waterLevel = ref<any | null>(null);
    const status = ref<any | null>(null);
    const errorMessage  = ref<string | null>(null);
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


    const updateDevice = async (moduleID: string, deviceName: string, locationName: string, longitude: number, latitude: number, deviceStatus: 'active' | 'inactive') => {
        const validated = deviceSchema.safeParse({moduleID, deviceName, locationName, latitude, longitude, deviceStatus});
        errorMessage.value = null;

        if(!validated.success){
            console.error(validated.error.issues);
            return;
        }

        try{
            // locationStore.updateDeviceStore(validated.data);
            const request = await $fetch('/api/location/update', {
            method: 'POST',
            body: validated.data
        });
        }catch(error){
            console.error(`An error occured when updating device ${error}`);
        }
    }

    return {
        errorMessage,
        waterLevel,
        status,
        isLoading,
        updateDevice,
        startListening,
        stopListening
    };


}