import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyCIQRND4tBmabpDuNk4gvvqu520tAZV4r0",
    authDomain: "note-bfe5f.firebaseapp.com",
    databaseURL: "https://note-bfe5f.firebaseio.com",
    projectId: "note-bfe5f",
    storageBucket: "note-bfe5f.appspot.com",
    messagingSenderId: "188123784169",
    appId: "1:188123784169:web:b514ec6f9873b2ce2f2178"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;