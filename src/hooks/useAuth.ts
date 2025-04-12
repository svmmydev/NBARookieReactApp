import { useIonRouter } from "@ionic/react";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";


export const useAuth = () => {
    const router = useIonRouter();  // Ionic navigation hook (used instead of useNavigate in Ionic React apps)


    /**
    * logout
    * Signs out the current user from Firebase Auth
    * Then navigates to the /login page using Ionic routing
    */
    const logout = async () => {
        try {
            await signOut(auth);
            router.push('/login', 'root');
        } catch (error) {
            console.error('Error al cerrar sesión', error);
        }
    };

    
    return { logout }
};