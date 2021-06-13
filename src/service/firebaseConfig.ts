import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDu2RKybeRFDgqR5VGR6ujdiS3co8Z4N6Y",
  authDomain: "mtrello-a9627.firebaseapp.com",
  projectId: "mtrello-a9627",
  storageBucket: "mtrello-a9627.appspot.com",
  messagingSenderId: "687554364786",
  appId: "1:687554364786:web:b8b364e93b6ae48fde49eb",
  measurementId: "G-974GS7KHHG",
  databaseURL: "https://mtrello-a9627-default-rtdb.firebaseio.com/",
});

export const auth = app.auth();
export default app;
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
