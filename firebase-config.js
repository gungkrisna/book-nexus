import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlRZyg5SAuswLoIdHqPAKvtkY-NODQOyY",
  authDomain: "book-nexus-aca3d.firebaseapp.com",
  projectId: "book-nexus-aca3d",
  storageBucket: "book-nexus-aca3d.appspot.com",
  messagingSenderId: "77197531225",
  appId: "1:77197531225:web:a40806ec6ea6adc7b43948",
  measurementId: "G-L92Z0JS9E0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);