
export default defineEventHandler(async (event) => {
    try{
        const snapshot = await adminRTDB
        .ref('locations')
        .once('value');
        const data = snapshot.val();
        return {message: "Data Retrieved", data};
    } catch(error){
        setResponseStatus(event, 500);
        return {errorMessage: `${error}`};
    }
})