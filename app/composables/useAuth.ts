import { signInWithEmailAndPassword, signOut, type Auth } from "firebase/auth";
import { useFirebaseAuth } from "vuefire";
import { email, z } from "zod";

const loginSchema = z.object({
    email: z.email(),
    password: z.string()
})

export const useAuth = () => {
    const auth = useFirebaseAuth()!;
    const errorMessage = ref<string | null>(null);
    
    const login = (email: string, password: string) => {
        const validated = loginSchema.safeParse({email, password});
        errorMessage.value = null;
        if(auth) {
            if(!validated.success){
                console.error(validated.error.issues);
                return
            }
            signInWithEmailAndPassword(auth, validated.data.email, validated.data.password)
            .then(() => {
                navigateTo('/');
            })
            .catch((error) => {
                switch (error) {
                    case 'auth/invalid-credential':
                        errorMessage.value = "Incorrect password or email.";
                    case 'auth/too-many-requests':
                        errorMessage.value =  "Too many failed login attempts. Please try again later.";
                        break;
                    case 'auth/network-request-failed':
                        errorMessage.value = "Network error. Please check your connection.";                    
                    default:
                        errorMessage.value = "An unexpected error occured. Please try again.";
                }
            })
        }else {
            console.error("Firebase auth instance is not available yet");
        }   
    }

    const logout = () => {
        signOut(auth)
        .then(() => {
            navigateTo('/');
        })
        .catch((error) => {
            console.log(error)
        })
    }


    return { errorMessage, login, logout }
}