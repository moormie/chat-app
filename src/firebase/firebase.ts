import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5R3zoxp7qNGh8e2d5t8TfP8H1Eq95wEU",
  authDomain: "chat-app-930f9.firebaseapp.com",
  projectId: "chat-app-930f9",
  storageBucket: "chat-app-930f9.appspot.com",
  messagingSenderId: "128077861667",
  appId: "1:128077861667:web:1ce04889fb1a9f88a83296",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
