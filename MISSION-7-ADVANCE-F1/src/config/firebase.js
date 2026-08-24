import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4uWX_Bh7EZ9IEFnAf7SKBXqPXkBKax0o",
  authDomain: "smk-dkv-website.firebaseapp.com",
  projectId: "smk-dkv-website",
  storageBucket: "smk-dkv-website.firebasestorage.app",
  messagingSenderId: "417866268351",
  appId: "1:417866268351:web:f7578717941b4b7c83900a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();