import { initializeApp } from 'firebase/app'
import { 
    getFirestore,
    collection,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    Timestamp,
    serverTimestamp,
    updateDoc
} from 'firebase/firestore'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    signOut
} from 'firebase/auth'
import {
    getStorage, 
    ref, //// const mountainsRef = ref(storage, 'mountains.jpg');
    getDownloadURL, // getDownloadURL(ref(storage, 'images/stars.jpg'))
    // upoloadByesResumable
} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDNKQbBodbvqMAY46DBEoKgSimqg3P2gvI",
    authDomain: "set-beta.firebaseapp.com",
    projectId: "set-beta",
    storageBucket: "set-beta.appspot.com",
    messagingSenderId: "451510016889",
    appId: "1:451510016889:web:d901784a38abc088962da8",
    measurementId: "G-774X74D3JX"
};

//init firebase
export const app = initializeApp(firebaseConfig)

//init firestore
const db = getFirestore()

// init firebase auth
const auth = getAuth()

// init storage
const storage = getStorage(app)

// Timestamp
const timestamp = serverTimestamp()

export { db, auth, storage, timestamp }