import { defineStore } from 'pinia'
import { auth, db } from '@/firebase'
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        userData: null,
        loading: true,
    }),
    actions: {
        async loginWithGoogle() {
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            this.user = result.user

            const userRef = doc(db, 'users', this.user.uid)
            const docSnap = await getDoc(userRef)

            if (!docSnap.exists()) {
                await setDoc(userRef, {
                    name: this.user.displayName,
                    email: this.user.email,
                    credits: 0,
                    role: 'user'
                })
            }

            this.userData = (await getDoc(userRef)).data()
        },
        async logout() {
            await signOut(auth)
            this.user = null
            this.userData = null
        },
        async fetchUserOnStart() {
            return new Promise((resolve) => {
                onAuthStateChanged(auth, async (user) => {
                    this.user = user

                    if (user) {
                        const docSnap = await getDoc(doc(db, 'users', user.uid))

                        if (docSnap.exists()) {
                            this.userData = docSnap.data()
                        }
                    } else {
                        this.userData = null
                    }

                    this.loading = false
                    resolve()
                })
            })
        }
    }
})