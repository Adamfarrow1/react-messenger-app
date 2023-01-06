// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "messengerapp-33115.firebaseapp.com",
  projectId: "messengerapp-33115",
  storageBucket: "messengerapp-33115.appspot.com",
  messagingSenderId: "699015468175",
  appId: "1:699015468175:web:22fccaf74f370cf8cb4cfa",
  measurementId: "G-LRJ1J6M5FX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();