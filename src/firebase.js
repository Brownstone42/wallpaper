import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyABtX0f1kMOJwLw-JPOcV68m6cgQooa6eQ",
    authDomain: "case01-54084.firebaseapp.com",
    projectId: "case01-54084",
    storageBucket: "case01-54084.firebasestorage.app",
    messagingSenderId: "345249840889",
    appId: "1:345249840889:web:a3d0def4de8264ee4b2c28"
};

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }