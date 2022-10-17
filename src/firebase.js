import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
  apiKey: "AIzaSyDn7bi9pxoO6E57RRoW2H5qarTES0SoJO0",
  authDomain: "unichat-6d8ec.firebaseapp.com",
  projectId: "unichat-6d8ec",
  storageBucket: "unichat-6d8ec.appspot.com",
  messagingSenderId: "40479871776",
  appId: "1:40479871776:web:e2b15191a454a6c9a67d45",
}).auth();