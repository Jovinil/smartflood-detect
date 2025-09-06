import { FieldValue } from "firebase-admin/firestore";
import z from "zod"

const logSchema = z.object({
    waterLevel: z.number("must be number")
});
const paramSchema = z.object({
    id: z.string("must be string")
})

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const param = getRouterParam(event, 'id');
    const validated = logSchema.safeParse(body);
    const validatedId = paramSchema.safeParse({id: param});
    let id = null;

    if(!validatedId.success){
        console.error(`${validated.error?.issues}`);
        return {errorMessage: `${validated.error?.issues}`}
    }else {
        id = validatedId.data.id
    }
    
    if(!validated.success){
        console.error(`${validated.error.issues}`);
        return {errorMessage: `${validated.error.issues}`};
    }else {
        const timestamp = Date.now().toString();
        try {
            const locationsRef = adminDB.collection('locations').doc(id).collection('logs').doc(timestamp);
            locationsRef.set({
                waterLevel: validated.data.waterLevel,
                createdAt: FieldValue.serverTimestamp()
            }, {merge: true})

            return {message: "Successfully inserted log"}

        }catch(error){
            setResponseStatus(event, 500);
            return {errorMessage: `${error}`}
        }
    }
})