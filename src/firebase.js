// src/firebase.ts
// Firebase Core
import { initializeApp, getApps, getApp } from "firebase/app";

// Firebase Services
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// Environment-based configuration (works in Vite/Next.js)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Prevent multiple app initializations (important in hot reload / Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Firebase Services exports
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Safe Analytics initialization
export const analytics = isSupported().then((supported) => {
  if (supported) return getAnalytics(app);
  return null;
});

export default app;