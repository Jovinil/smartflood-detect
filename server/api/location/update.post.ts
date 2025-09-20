import { serverTimestamp } from "firebase/database";
import z from "zod"

const statusSchema = z.object({
    moduleID: z.string(),
    deviceName: z.string(),
    longitude: z.number(),
    latitude: z.number(),
    locationName: z.string(),
    deviceStatus: z.literal(['active', 'inactive']),
});

export default defineEventHandler( async (event) => {
    const body = await readBody(event);
    const validated = statusSchema.safeParse(body);

    if(!validated.success){
        console.error(`${validated.error.issues}`);
        setResponseStatus(event, 400);
        return {errorMessage: `${validated.error.issues}`};
    }else {
        try {
            const locationPath = adminRTDB.ref(`locations/${validated.data.moduleID}`)
            // console.log(validated.data)
            locationPath.update({
                deviceName: validated.data.deviceName,
                locationName: validated.data.locationName,
                longitude: validated.data.longitude,
                latitude: validated.data.latitude,
                deviceStatus: validated.data.deviceStatus,
                updatedAt: serverTimestamp()
            });
            
            return {message: `Device ${validated.data.moduleID} : ${validated.data.deviceName} successfully deactivated`}

        }catch(error){
            setResponseStatus(event, 500);
            return {errorMessage: `${error}`};
        }
    }
})