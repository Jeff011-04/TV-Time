import firebase from 'firebase/app';
import 'firebase/auth'; // Firebase authentication
import 'firebase/firestore'; // Firebase Firestore

// Your Firebase config (replace with your actual Firebase credentials)
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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized
}

// Export the Firebase Auth and Firestore instances
export const auth = firebase.auth();
export const firestore = firebase.firestore();
