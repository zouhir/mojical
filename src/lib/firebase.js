import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyD9ZcPh6EBhGfD-w8NyCoH1lEH1tPczHpI",
  authDomain: "calendar-moji.firebaseapp.com",
  databaseURL: "https://calendar-moji.firebaseio.com",
  projectId: "calendar-moji",
  storageBucket: "calendar-moji.appspot.com",
  messagingSenderId: "939606726339"
};

firebase.initializeApp(config);

const firebaseAuth = firebase.auth;

export { firebaseAuth };
