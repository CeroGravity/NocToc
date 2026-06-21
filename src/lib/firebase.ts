import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Guard initialization: when the env config is absent (e.g. during a build
// before keys are provided, or static prerendering), skip init so module load
// never throws auth/invalid-api-key. Once NEXT_PUBLIC_FIREBASE_API_KEY is set,
// init runs normally with no further code changes.
const isConfigured = Boolean(firebaseConfig.apiKey);

const app: FirebaseApp | undefined = isConfigured
  ? getApps().length
    ? getApp()
    : initializeApp(firebaseConfig)
  : undefined;

const auth = app ? getAuth(app) : (undefined as unknown as Auth);
const db = app ? getFirestore(app) : (undefined as unknown as Firestore);

export { app, auth, db, isConfigured };
