// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  CACHE_SIZE_UNLIMITED,
  getFirestore,
  enableIndexedDbPersistence,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "doctolib-pwa.firebaseapp.com",
  projectId: "doctolib-pwa",
  storageBucket: "doctolib-pwa.appspot.com",
  messagingSenderId: "457347835988",
  appId: "1:457347835988:web:ea33ecc3aaa8b001a065c1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const db = getFirestore(app);
enableIndexedDbPersistence(db, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
}).then(_ => console.log('persist')).catch((err) => {
  if (err.code == "failed-precondition") {
    console.log("multitab open");
  } else if (err.code == "unimplemented") {
    console.log("cant persist")
  }
});

export const firestore = db;