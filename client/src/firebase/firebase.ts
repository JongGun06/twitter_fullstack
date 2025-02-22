import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYjoiQUecr4z7hQGLWg4QY80JPOw9qk8o",
  authDomain: "twitter-490ad.firebaseapp.com",
  projectId: "twitter-490ad",
  storageBucket: "twitter-490ad.firebasestorage.app",
  messagingSenderId: "1051347561477",
  appId: "1:1051347561477:web:1699e3079170f30cfec06c",
  measurementId: "G-JGVT70NBJD",
};



let app = firebase.initializeApp(firebaseConfig)
let db = app.firestore()
let auth = app.auth()
export {db,auth}