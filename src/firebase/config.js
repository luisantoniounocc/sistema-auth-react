import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4sDJcbo2iovSc_VDRNScHxKBBgvlXq8s",
  authDomain: "basereact-8bf3b.firebaseapp.com",
  projectId: "basereact-8bf3b",
  storageBucket: "basereact-8bf3b.firebasestorage.app",
  messagingSenderId: "138873949596",
  appId: "1:138873949596:web:883b42c2014198a8344c59"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);