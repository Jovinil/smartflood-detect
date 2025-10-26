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
        const before = await adminDB.collection('messages').doc(validated.data.status).get()

        const messageRef = await adminDB.collection('messages').doc(validated.data.status)
        messageRef.set({
            heading: validated.data.heading,
            body: validated.data.message
        }, {merge: true});

        const after = await adminDB.collection('messages').doc(validated.data.status).get()

        if(!before.exists && !after.exists) {
            console.log('Before or after data does not exist')
            return;
        }
        const actionLogRef = await $fetch('/api/actionLog/message/create',{
            method: 'POST',
            body: {
                status: validated.data.status,
                logType: 'UPDATE',
                before: before.data(),
                after: after.data()
            }
        })

    }catch(error){
        setResponseStatus(event, 500);
        return {errorMessage: error}
    }
})