import z from "zod";
import { adminDB, adminRTDB } from "../../utils/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";


/* WILL NOT BE USED */

const locationSchema = z.object({
    moduleID: z.string(),
    deviceName: z.string(),
    locationName: z.string(),
    longitude: z.number(),
    latitude: z.number(),
    // watereLevel: z.number(), this will be added by default
    // waterLevelStatus: z.number(), this will be added by default
    deviceStatus: z.literal(['active', 'inactive']),

})

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const validated = locationSchema.safeParse(body);
    
    if(!validated.success){
        console.error(validated.error.issues)
        return {errorMessage: validated.error.issues};
    }else {
        try {
            // realtime db
            const locationsPath = adminRTDB.ref('locations/' + validated.data.moduleID);
            locationsPath.set({
                deviceName: validated.data.deviceName,
                locationName: validated.data.locationName,
                longitude: validated.data.longitude,
                latitude: validated.data.latitude,
                currentWaterLevel: 0,
                // statuses safe, warning, danger,
                currentWaterLevelStatus: 'safe',
                deviceStatus: validated.data.deviceStatus,
            }, (error) => {
                if(error) {
                    setResponseStatus(event, 500);
                    return {errorMessage: error};
                }else {
                    return {message: "Successfully inserted data to realtime database"};
                }
            });

            // firestores
            const locationsRef = adminDB.collection('locations').doc(validated.data.moduleID);
            locationsRef.set({
                deviceName: validated.data.deviceName,
                locationName: validated.data.locationName,
                longitude: validated.data.longitude,
                latitude: validated.data.latitude,
                createdAt: FieldValue.serverTimestamp(),
            })

            return {message: "Successfully inserted data to firestore"};
            
        }catch(error){
            setResponseStatus(event, 500);
            return {errorMessage: error};
        }
    }
})