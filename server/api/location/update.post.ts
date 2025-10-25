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
            const beforePath = await adminRTDB.ref(`locations/${validated.data.moduleID}`).once('value')
            const before = beforePath.val()

            const locationPath = await adminRTDB.ref(`locations/${validated.data.moduleID}`)
            // console.log(validated.data)
            locationPath.update({
                deviceName: validated.data.deviceName,
                locationName: validated.data.locationName,
                longitude: validated.data.longitude,
                latitude: validated.data.latitude,
                deviceStatus: validated.data.deviceStatus,
                updatedAt: serverTimestamp()
            });

            const afterPath = await adminRTDB.ref(`locations/${validated.data.moduleID}`).once('value')
            const after = afterPath.val()

            const locationsRef = await adminDB.collection('locations').doc(validated.data.moduleID);
            locationsRef.set({
                deviceName: validated.data.deviceName,
                locationName: validated.data.locationName,
                longitude: validated.data.longitude,
                latitude: validated.data.latitude,
            }, {merge: true})

            if(!before && !after) {
            console.log('Before or after data does not exist')
            return;
            }
            console.log(before)

            const actionLogRef = await $fetch('/api/actionLog/location/create',{
                method: 'POST',
                body: {
                    moduleID: validated.data.moduleID,
                    logType: 'UPDATE',
                    before: before,
                    after: after
                }
            })
            
            return {message: `Device ${validated.data.moduleID} : ${validated.data.deviceName} successfully deactivated`}

        }catch(error){
            setResponseStatus(event, 500);
            return {errorMessage: `${error}`};
        }
    }
})