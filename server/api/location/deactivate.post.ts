import { serverTimestamp } from "firebase/database";
import z from "zod"

const statusSchema = z.object({
    moduleID: z.string(),
    status: z.literal(['PENDING', 'ACTIVE', 'INACTIVE', 'DELETED']),
});

export default defineEventHandler( async (event) => {
    const body = await readBody(event);
    const validated = statusSchema.safeParse(body);

    if(!validated.success){
        console.error(`${validated.error.issues}`);
        return {errorMessage: `${validated.error.issues}`};
    }else {
        try {
            const locationPath = adminRTDB.ref(`locations/${validated.data.moduleID}`)
            locationPath.update({
                status: validated.data.status,
                dateOfDeactivation: serverTimestamp()
            });
            
            return {message: `Device ${validated.data.moduleID} successfully deactivated`}

        }catch(error){
            setResponseStatus(event, 500);
            return {errorMessage: `${error}`};
        }
    }
})