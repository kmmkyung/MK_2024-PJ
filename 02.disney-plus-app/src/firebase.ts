// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAy-OqjU018ka7oIMvXhcZ22wkJht0QkqE",
  authDomain: "react-disneyplus-app-6c3fc.firebaseapp.com",
  projectId: "react-disneyplus-app-6c3fc",
  storageBucket: "react-disneyplus-app-6c3fc.firebasestorage.app",
  messagingSenderId: "977021199068",
  appId: "1:977021199068:web:dd45a368b91572293b4a19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);