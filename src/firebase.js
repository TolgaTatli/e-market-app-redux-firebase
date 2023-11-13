// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6qFHKc8-v-jhURxBUBrQ3DJm_FqZG5Zs",
  authDomain: "e-market-test-case.firebaseapp.com",
  projectId: "e-market-test-case",
  storageBucket: "e-market-test-case.appspot.com",
  messagingSenderId: "163230583984",
  appId: "1:163230583984:web:31286cdf85eb21624a7f75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)