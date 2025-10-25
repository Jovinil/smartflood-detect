
export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');

    if(!id){
        setResponseStatus(event, 400);
        return {errorMessage: "Missing ID parameter", exist: false}
    }

    try{
        const snapshot = await adminRTDB
        .ref(`locations/${id}`)
        .once('value');
        const data = snapshot.val();

        if(!snapshot.exists()) {
            setResponseStatus(event, 404);
            return {errorMessage: "Location not found", exist: false};
        }

        return {message: "Data Retrieved", exist: true, data};
    } catch(error){
        setResponseStatus(event, 500);
        return {errorMessage: `${error}`};
    }
})