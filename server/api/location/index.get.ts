
export default defineEventHandler(async (event) => {
    let dataArr: Array<object> = [];
    try{
        const snapshot = await adminRTDB
        .ref('locations')
        .orderByChild('deviceStatus')
        .equalTo('active')
        .once('value');
        const data = snapshot.val();
        
        const arr = Object.keys(data).map((key) => ({ label: data[key].deviceName, moduleID: key, ...data[key] }))
        
        return { data: arr, message: "Data Retrieved" };
    } catch(error){
        setResponseStatus(event, 500);
        return {errorMessage: `${error}`};
    }
})