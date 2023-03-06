import React from 'react'
import ReactDOM from 'react-dom/client'
import Connect from './Connect'
import './index.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_API_KEY,
  authDomain: "doctolib-pwa.firebaseapp.com",
  projectId: "doctolib-pwa",
  storageBucket: "doctolib-pwa.appspot.com",
  messagingSenderId: "457347835988",
  appId: "1:457347835988:web:ea33ecc3aaa8b001a065c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(

    <Connect />
)
