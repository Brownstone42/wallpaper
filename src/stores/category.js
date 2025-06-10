import { defineStore } from 'pinia'
import { collection, getDocs } from 'firebase/firestore'
import { ref as storageRef, getDownloadURL } from 'firebase/storage'
import { db, storage } from '@/firebase'

export const useCategoryStore = defineStore('category', {
    state: () => ({
        categories: []
    }),
    actions: {
        async loadCategories() {
            const snapshot = await getDocs(collection(db, 'categories'))
            const raw = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

            for (const cat of raw) {
                try {
                    const fileRef = storageRef(storage, `images/categories/${cat.image}`)
                    cat.imageUrl = await getDownloadURL(fileRef)
                } catch (e) {
                    console.warn(`Image load failed: ${cat.image}`, e)
                    cat.imageUrl = ''
                }
            }

            this.categories = raw.sort((a, b) => a.order - b.order)
        }
    }
})