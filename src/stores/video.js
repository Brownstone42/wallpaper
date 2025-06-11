import { defineStore } from 'pinia'
import { db, storage } from '@/firebase'
import { collection, getDocs, getDoc, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref as storageRef, uploadBytes, listAll } from 'firebase/storage'

export const useVideoStore = defineStore('video', {
    state: () => ({
        videoDocs: [],
        storageVideos: [],
        categories: [],
        videosByCategory: {}
    }),
    getters: {
        getVideosByCategory: (state) => (categoryId) => {
            return state.videosByCategory[categoryId] || []
        }
    },
    actions: {
        async fetchVideosByCategory(categoryId) {
            if (this.videosByCategory[categoryId]) {
                // ✅ Already cached
                return
            }

            const snap = await getDocs(collection(db, 'videos'))
            const filtered = snap.docs
                .filter(doc => doc.data().categoryId === categoryId)
                .map(doc => ({ id: doc.id, ...doc.data() }))

            this.videosByCategory[categoryId] = filtered
        },
        async fetchVideoDocs() {
            const snap = await getDocs(collection(db, 'videos'))
            this.videoDocs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        },
        async fetchStorageVideos() {
            const list = await listAll(storageRef(storage, 'videos'))
            this.storageVideos = list.items.map(item => item.name)
        },
        async fetchCategories() {
            const snap = await getDocs(collection(db, 'categories'))
            this.categories = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        },
        async uploadVideoFile(file) {
            const path = `videos/${file.name}`
            const ref = storageRef(storage, path)
            await uploadBytes(ref, file)
            return path
        },
        async createVideoDoc(data) {
            const docRef = await addDoc(collection(db, 'videos'), data)
            return docRef.id
        },
        async addVariant(videoId, variantData) {
            const variantRef = collection(db, 'videos', videoId, 'variants')
            await addDoc(variantRef, {
                ...variantData,
                created: serverTimestamp()
            })
        },
        async getVideoDoc(id) {
            const snap = await getDoc(doc(db, 'videos', id))
            return snap.exists() ? snap.data() : null
        },
        async getVariantCount(videoId) {
            const snap = await getDocs(collection(db, 'videos', videoId, 'variants'))
            return snap.size
        }
    }
})