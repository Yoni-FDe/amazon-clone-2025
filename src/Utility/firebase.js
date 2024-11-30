// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
// this used for authentication purpose
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDx7SBFaLVOdqVUMqi1_0X0nMHvJ8to-Ng",
  authDomain: "clone-y2024.firebaseapp.com",
  projectId: "clone-y2024",
  storageBucket: "clone-y2024.firebasestorage.app",
  messagingSenderId: "615484300824",
  appId: "1:615484300824:web:c563542a671eac50eb2d6d",
  measurementId: "G-H6N86GYP8E"
};

// Use this to initialize the firebase App
const firebaseApp =firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
export { auth, db };