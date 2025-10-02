
export default defineEventHandler(async (event) => {
        try {   
            const messageRef = await adminDB.collection('messages').get()

            const messages = messageRef.docs.map(doc => ({ ...doc.data()}))

            return { message: "Data Retrieved", data: messages }

            
        }catch(error) {
            console.error(`${error}`);
            return {errorMessage: `${error}`}
        }
    }
)