import {getBuildEnv} from "@utils/get-env";
import {getAnalytics} from "firebase/analytics";
import {initializeApp} from "firebase/app";
import {getAuth, signOut} from "firebase/auth";
import {GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
    apiKey: getBuildEnv("FIREBASE_API_KEY"),
    authDomain: getBuildEnv("FIREBASE_AUTH_DOMAIN"),
    projectId: getBuildEnv("FIREBASE_PROJECT_ID"),
    storageBucket: getBuildEnv("FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: getBuildEnv("FIREBASE_MESSAGING_SENDER_ID"),
    appId: getBuildEnv("FIREBASE_APPID"),
    measurementId: getBuildEnv("FIREBASE_MEASUREMENT_ID")
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export const logOut = async () => await signOut(auth);
