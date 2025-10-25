import { FieldValue } from "firebase-admin/firestore";
import z from "zod";

const locationSchema = z.object({
    moduleID: z.string(),
    logType: z.string(),
    before: z.object({
        deviceName: z.string().optional(),
        locationName: z.string().optional(),
        longitude: z.number().optional(),
        latitude: z.number().optional(),
        deviceStatus: z.literal(['active', 'inactive']).optional(),
    }).nullable(),
    after: z.object({
        deviceName: z.string(),
        locationName: z.string(),
        longitude: z.number(),
        latitude: z.number(),
        deviceStatus: z.literal(['active', 'inactive']),
    })

})

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const validated = locationSchema.safeParse(body, {reportInput: true});
    
    if(!validated.success){
        console.error(validated.error.issues)
        return {errorMessage: validated.error.issues}
    }

    try{
        const timestamp = Date.now().toString();
        const actionLogsRef = await adminDB.collection('actionLogs').doc(timestamp);
        actionLogsRef.create({
            id: validated.data.moduleID,
            category: 'location',
            logType: validated.data.logType,
            before: {
                deviceName: validated.data.before?.deviceName,
                locationName: validated.data.before?.locationName,
                longitude: validated.data.before?.longitude,
                latitude: validated.data.before?.latitude,
                deviceStatus: validated.data.before?.deviceStatus,
            },
            after: {
                deviceName: validated.data.after.deviceName,
                locationName: validated.data.after.locationName,
                longitude: validated.data.after.longitude,
                latitude: validated.data.after.latitude,
                deviceStatus: validated.data.after.deviceStatus,
            },
            createdAt: FieldValue.serverTimestamp()

        })


        return {message: "Successfully inserted data to firestore"};
        
    }catch(error){
        console.error(`${error}`);
        return { errorMessage: `${error}` }
    }
})