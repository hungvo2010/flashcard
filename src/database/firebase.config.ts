import { initializeApp } from "firebase/app";
import { collection, CollectionReference, DocumentData, getFirestore } from "firebase/firestore";

// console.log(process.env.FIREBASE_AUTH_DOMAIN);

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: process.env.FIBASE_API_KEY,
  // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.FIREBASE_PROJECT_ID,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.FIREBASE_APP_ID
  apiKey: "AIzaSyBWDFg-n6ru7gjv6Y-IY-YNAx5e74Cs__c",
  authDomain: "tkpm-note.firebaseapp.com",
  projectId: "tkpm-note",
  storageBucket: "tkpm-note.appspot.com",
  messagingSenderId: "422612356852",
  appId: "1:422612356852:web:7358ece2f20282f2a258a1s"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>
}
