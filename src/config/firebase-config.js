// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWe6sw0zLv6SuDEU6ZsZikvfwSPNHeItU",
  authDomain: "flash-803cc.firebaseapp.com",
  projectId: "flash-803cc",
  storageBucket: "flash-803cc.appspot.com",
  messagingSenderId: "840540886036",
  appId: "1:840540886036:web:0cefa746d42c231eba8301",
  measurementId: "G-Z26EWCXFJB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);