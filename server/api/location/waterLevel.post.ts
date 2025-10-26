import { serverTimestamp } from "firebase/database";
import z, { number } from "zod"

const locationSchema = z.object({
    moduleID: z.string("Must be a string"),
    waterLevel: z.number("Must be a number"),
    waterLevelStatus: z.literal(['safe', 'warning', 'danger'])
})
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const validated = locationSchema.safeParse(body);

    if(!validated.success){
        console.error(`${validated.error.issues}`);
        return {errorMessage: `${validated.error.issues}`};
    }else {
        try {
            const locationPath = adminRTDB.ref(`locations/${validated.data.moduleID}`)
            locationPath.update({
                currentWaterLevel: validated.data.waterLevel,
                currentWaterLevelStatus: validated.data.waterLevelStatus,
                updatedAt: serverTimestamp()
            });


            const response = await $fetch(`/api/location/log/${validated.data.moduleID}`, {
            method: 'POST',
            body: {
                waterLevel: validated.data.waterLevel,
                waterLevelStatus: validated.data.waterLevelStatus
            }
            })

            return {message: "Device Water Level Updated." , recieved: validated.data, response};

        }catch(error){
            console.error(`${error}`)
            return {errorMessage: `${error}`}
        }
    }
})