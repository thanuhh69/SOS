import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHPK3L_iGfrAXs86MZIesvZAcyv7NcuOA",
  authDomain: "studentos-a44d9.firebaseapp.com",
  projectId: "studentos-a44d9",
  storageBucket: "studentos-a44d9.firebasestorage.app",
  messagingSenderId: "195032979410",
  appId: "1:195032979410:web:6f3f3e749a729bb4acda0b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);