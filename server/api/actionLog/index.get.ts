export default defineEventHandler(async (event) => {
    try {   
        const actionLogRef = await adminDB.collection('actionLogs').get()

        const actionLog = actionLogRef.docs.map(doc => ({ ...doc.data(), createdAt: doc.data().createdAt.toDate().toISOString()}))

        return { message: "Data Retrieved", data: actionLog }

            
        }catch(error) {
            console.error(`${error}`);
            return {errorMessage: `${error}`}
        }
})