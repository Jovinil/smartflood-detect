import { doc } from "firebase/firestore";

export default defineEventHandler(async (event) => {
    try{
        const actionLogs = await adminDB.collection('actionLogs').where('category', '==', 'message').get();

        const data = actionLogs.docs.map(doc => ({...doc.data()}))

        return { message: "Data Retrieved", data: data }

    }catch(error){
        console.error(`${error}`);
        return { errorMessage: `${error}` }
    }
})