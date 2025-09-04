import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBYCLh3sbIYM9GK8dRn2gNXwTNHwwRLCiI",
  authDomain: "learning-58aa1.firebaseapp.com",
  projectId: "learning-58aa1",
  storageBucket: "learning-58aa1.firebasestorage.app",
  messagingSenderId: "1039788372807",
  appId: "1:1039788372807:web:43b7f5c7c026564033d262",
  measurementId: "G-DZ7GL0QH22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);