import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWDFg-n6ru7gjv6Y-IY-YNAx5e74Cs__c",
  authDomain: "tkpm-note.firebaseapp.com",
  projectId: "tkpm-note",
  storageBucket: "tkpm-note.appspot.com",
  messagingSenderId: "422612356852",
  appId: "1:422612356852:web:7358ece2f20282f2a258a1"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);

