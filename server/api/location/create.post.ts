import z, { nullable } from "zod";
import { adminDB, adminRTDB } from "../../utils/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";



const locationSchema = z.object({
    moduleID: z.string(),
    deviceName: z.string(),
    locationName: z.string().optional(),
    longitude: z.number().optional(),
    latitude: z.number().optional(),
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

            // CHECK IF DEVICE ALREADY EXISTS
            const deviceSnapshot = await adminRTDB.ref(`locations/${validated.data.moduleID}`).once('value')

            if(!deviceSnapshot.exists()){
                return;
            }

            // realtime db
            const locationsPath = adminRTDB.ref(`locations/${validated.data.moduleID}`);
            locationsPath.set({
                deviceName: validated.data.deviceName,
                locationName: validated.data.locationName || "Catanduanes Circumferential Road",
                longitude: validated.data.longitude || 124.22668173159855,
                latitude: validated.data.latitude || 13.580466328470095,
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
            const locationsRef = await adminDB.collection('locations').doc(validated.data.moduleID);
            locationsRef.set({
                deviceName: validated.data.deviceName,
                locationName: validated.data.locationName,
                longitude: validated.data.longitude,
                latitude: validated.data.latitude,
                createdAt: FieldValue.serverTimestamp(),
            })

            const actionLogRef = await $fetch('/api/actionLog/location/create',{
            method: 'POST',
            body: {
                moduleID: validated.data.moduleID,
                logType: 'CREATE',
                before:null,
                after: {
                    deviceName: validated.data.deviceName,
                    deviceStatus: validated.data.deviceStatus,
                    locationName: validated.data.locationName,
                    longitude: validated.data.longitude,
                    latitude: validated.data.latitude,
                }
            }
            })

            return {message: "Successfully inserted data to firestore"};
            
        }catch(error){
            setResponseStatus(event, 500);
            return {errorMessage: error};
        }
    }
})