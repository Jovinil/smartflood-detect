import z from "zod";

const paramSchema = z.object({
    id: z.string("Must be a string")
})

export default defineEventHandler(async (event) => {
    const param = getRouterParam(event, 'id');
    const validated = paramSchema.safeParse({id: param})

    if(!validated.success){
        console.error(validated.error.issues);
        return {errorMessage: `${validated.error.issues}`}
    }else {
        try {   
            const logsRef = adminDB.collection('locations').doc(validated.data.id).collection('logs')
            const snapshot = await logsRef.orderBy('createdAt', 'desc').get();

            const logs = snapshot.docs.map(doc => ({id: validated.data.id, waterLevel: doc.data().waterLevel, waterLevelStatus: doc.data().waterLevelStatuss}))

            return logs;
            
        }catch(error) {
            console.error(`${error}`);
            return {errorMessage: `${error}`}
        }
    }
})