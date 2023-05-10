
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDCKV3b9in2BB8MzngrWObz_2ppAI714P8",
  authDomain: "fir-tutorial-7c5b4.firebaseapp.com",
  projectId: "fir-tutorial-7c5b4",
  storageBucket: "fir-tutorial-7c5b4.appspot.com",
  messagingSenderId: "371804981632",
  appId: "1:371804981632:web:2d90ce6de4f094774a1965",
  measurementId: "G-4GDG89FJYN"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);