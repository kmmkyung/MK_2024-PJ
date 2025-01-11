// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6xBvQ2Sd0w9CipSrE31r_pjZkIq73n94",
  authDomain: "react-disney-plus-app-60b4b.firebaseapp.com",
  projectId: "react-disney-plus-app-60b4b",
  storageBucket: "react-disney-plus-app-60b4b.firebasestorage.app",
  messagingSenderId: "182998775448",
  appId: "1:182998775448:web:4195ee0e212c76e474c2ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig) ;

export default app ;



