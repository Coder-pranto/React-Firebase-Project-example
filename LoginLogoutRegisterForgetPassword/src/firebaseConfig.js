import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC11pFo3GoDXr-O8JcOmFL4vAmmsSlmb5I",
  authDomain: "loginlogoutforgotpassregis.firebaseapp.com",
  projectId: "loginlogoutforgotpassregis",
  storageBucket: "loginlogoutforgotpassregis.appspot.com",
  messagingSenderId: "582420684913",
  appId: "1:582420684913:web:fff286b57ac9059d113bd0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
