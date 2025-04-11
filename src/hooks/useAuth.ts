import { useIonRouter } from "@ionic/react";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";


export const useAuth = () => {
    const router = useIonRouter();

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