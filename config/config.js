import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCvkyhseanwveB4mQg3GXzhYdP6oyrUppI",
  authDomain: "photo-feed-80453.firebaseapp.com",
  databaseURL: "https://photo-feed-80453.firebaseio.com",
  projectId: "photo-feed-80453",
  storageBucket: "",
  messagingSenderId: "183762429987",
  appId: "1:183762429987:web:1c8e8b421b20ded4"
};

firebase.initializeApp(firebaseConfig);

export const f = firebase;
export const auth = firebase.auth();
export const database = firebase.database();
export const storage = firebase.storage();
