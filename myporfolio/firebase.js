// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDf3BqQJoXywbkAdGy0BMHf_NodpC6o_jQ",
  authDomain: "porfolio-ed19b.firebaseapp.com",
  projectId: "porfolio-ed19b",
  storageBucket: "porfolio-ed19b.appspot.com",
  messagingSenderId: "605110849524",
  appId: "1:605110849524:web:5fb917fe6e2a8c313f73a1",
  measurementId: "G-G16WLCEQLX"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);



export { app, db };