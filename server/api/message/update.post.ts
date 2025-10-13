import z from "zod";

const messageSchema = z.object({
    status: z.literal(['safe', 'warning', 'danger']),
    heading: z.string(),
    message:z.string()
});

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const validated = messageSchema.safeParse(body);

    if(!validated.success){
        console.error(validated.error.issues)
        return {errorMessage: validated.error.issues}
    }

    try{
        const messageRef = adminDB.collection('messages').doc(validated.data.status)
        messageRef.set({
            heading: validated.data.heading,
            body: validated.data.message
        }, {merge: true});
        
    }catch(error){
        setResponseStatus(event, 500);
        return {errorMessage: error}
    }
})