// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAov3VmE9_aLvk7ESmgjVXHy5AIZ7wL-Lk",
  authDomain: "usermetadata-28585.firebaseapp.com",
  projectId: "usermetadata-28585",
  storageBucket: "usermetadata-28585.firebasestorage.app",
  messagingSenderId: "35324745279",
  appId: "1:35324745279:web:c4ff86857a950aff8d0a8a",
  measurementId: "G-7646ETJKTT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);