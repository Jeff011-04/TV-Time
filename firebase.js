// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFDUsD8vZs0_kc5kM9SLpirIBYirzxPvk",
  authDomain: "tv-time-40b49.firebaseapp.com",
  projectId: "tv-time-40b49",
  storageBucket: "tv-time-40b49.firebasestorage.app",
  messagingSenderId: "23522765874",
  appId: "1:23522765874:web:1a3886f552cde49d78e02b",
  measurementId: "G-SC49MTN87H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);