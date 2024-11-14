import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzjlSqq284zEA7O3sYoFqldetplnMR58w",
  authDomain: "mins-session-tezeract.firebaseapp.com",
  projectId: "mins-session-tezeract",
  storageBucket: "mins-session-tezeract.firebasestorage.app",
  messagingSenderId: "764109966756",
  appId: "1:764109966756:web:d5b6ac929aee432dcf0531",
  measurementId: "G-6XVT7PHX3B",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
