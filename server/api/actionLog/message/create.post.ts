import { FieldValue } from "firebase-admin/firestore";
import z from "zod";

const messageSchema = z.object({
    status: z.enum(['safe', 'warning', 'danger']),
    logType: z.string(),
    before: z.object({
        id: z.number(),
        heading: z.string(),
        message: z.string(),
    }),
    after: z.object({
        id: z.number(),
        heading: z.string(),
        message: z.string()
    })
});

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const validated = messageSchema.safeParse(body);

    if(!validated.success){
        console.error(validated.error.issues)
        return {errorMessage: validated.error.issues}
    }


    try{
        const timestamp = Date.now().toString();
        const actionLogsRef = await adminDB.collection('actionLogs').doc(timestamp);
        actionLogsRef.create({
            id: validated.data.status,
            category: 'message',
            logType: validated.data.logType,
            before: {
                id: validated.data.before.id,
                heading: validated.data.before.heading,
                message: validated.data.before.message
            },
            after: {
                id: validated.data.after.id,
                heading: validated.data.after.heading,
                message: validated.data.after.message
            },
            createdAt: FieldValue.serverTimestamp()

        })


        return {message: "Successfully inserted data to firestore"};
        
    }catch(error){
        console.error(`${error}`);
        return { errorMessage: `${error}` }
    }
})