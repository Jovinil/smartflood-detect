import z from "zod";
import { adminDB, adminRTDB } from "../../utils/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

const locationSchema = z.object({
    moduleID: z.string(),
    locationName: z.string(),
    longitude: z.number(),
    latitude: z.number(),
    status: z.literal(['PENDING', 'ACTIVE', 'INACTIVE', 'DELETED']),
})

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const validated = locationSchema.safeParse(body);
    
    if(!validated.success){
        console.error(validated.error.issues)
        return {errorMessage: validated.error.issues};
    }else {
        try {
            const locationsPath = adminRTDB.ref('locations/' + validated.data.moduleID);
            locationsPath.set({
                currentWaterLevel: 0,
                status: validated.data.status
            }, (error) => {
                if(error) {
                    setResponseStatus(event, 500);
                    return {errorMessage: error};
                }else {
                    return {message: "Successfully inserted data to realtime database"};
                }
            });

            const locationsRef = adminDB.collection('locations').doc(validated.data.moduleID);
            locationsRef.set({
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