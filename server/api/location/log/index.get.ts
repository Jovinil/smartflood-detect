
export default defineEventHandler(async (event) => {
    try{
        const snapshot = await adminDB.collectionGroup('logs').orderBy('createdAt', 'asc').get();
        // const snapshot = await adminDB
        // .collectionGroup('logs')
        // .where('createdAt', '!=', null)
        // .orderBy('createdAt', 'desc')
        // .get()
    
        const logs = snapshot.docs.map(doc => ({
            id: doc.ref.parent.parent?.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate().toISOString()
        }))

        return logs;

    }catch(error){
        setResponseStatus(event, 500)
        console.error(`${error}`)
        return {errorMessage: `${error}`}
    }
})