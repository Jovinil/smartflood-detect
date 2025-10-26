
export default defineEventHandler(async (event) => {
    try{
        const snapshot = await adminDB.collectionGroup('logs').orderBy('createdAt', 'desc').get();
    
        const logs = snapshot.docs.map(doc => ({
            id: doc.ref.parent.parent?.id,
            ...doc.data()
        }))

        return logs;

    }catch(error){
        setResponseStatus(event, 500)
        console.error(`${error}`)
        return {errorMessage: `${error}`}
    }
})