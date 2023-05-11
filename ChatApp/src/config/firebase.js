
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCZJXMsAVH-hQ4dFo44aHjudM70RbFrcr8",
  authDomain: "pras-play-chatapp.firebaseapp.com",
  projectId: "pras-play-chatapp",
  storageBucket: "pras-play-chatapp.appspot.com",
  messagingSenderId: "578896635976",
  appId: "1:578896635976:web:cd7f6dc14375c98bdb107d",
  measurementId: "G-3VBT48FCR6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
 export const db = getFirestore(app);
