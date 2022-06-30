import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIBASE_API_KEY || "AIzaSyBWDFg-n6ru7gjv6Y-IY-YNAx5e74Cs__c",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "tkpm-note.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "tkpm-note",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "tkpm-note.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "422612356852",
  appId: process.env.FIREBASE_APP_ID || "1:422612356852:web:7358ece2f20282f2a258a1"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);

