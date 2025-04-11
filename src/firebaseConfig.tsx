import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAXvJ5pNG-wzLDP6LDHwRlL0osWyb7Wv9Q",
    authDomain: "nbarookieapp-fad2e.firebaseapp.com",
    projectId: "nbarookieapp-fad2e",
    storageBucket: "nbarookieapp-fad2e.firebasestorage.app",
    messagingSenderId: "133109009732",
    appId: "1:133109009732:web:b55b7d54f5095bd6b0db11",
    measurementId: "G-ZMZ16YJQM4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);