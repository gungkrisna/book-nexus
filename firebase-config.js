import firebase from "firebase";

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
};

// Initialize Firebase
let app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()
const db = app.firestore()
const storage = firebase.storage();

export { auth, db, storage };