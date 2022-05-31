// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDbLHmmOvleBF-q7AE3ceqgvVDlBQzigU0',
  authDomain: 'noctoc-404.firebaseapp.com',
  projectId: 'noctoc-404',
  storageBucket: 'noctoc-404.appspot.com',
  messagingSenderId: '83100159604',
  appId: '1:83100159604:web:55f3fd32a6c32bc633cb21',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
