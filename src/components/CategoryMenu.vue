<template>
    <section class="section">
        <div class="container">
            <h2 class="title is-4 has-text-centered">Select a Category</h2>

            <div class="columns is-multiline is-centered">
                <div class="column is-one-quarter" v-for="category in categories" :key="category.id">
                    <div class="box has-text-centered" @click="$emit('select-category', category)">
                        <p class="title is-5">{{ category.name }}</p>
                        <figure class="image is-4by3">
                            <img :src="category.imageUrl" alt="Category" />
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { collection, getDocs } from 'firebase/firestore'
import { ref as storageRef, getDownloadURL } from 'firebase/storage'
import { db, storage } from '@/firebase'

export default {
    name: 'CategoryMenu',
    data() {
        return {
            categories: []
        }
    },
    async created() {
        const snapshot = await getDocs(collection(db, 'categories'))
        const raw = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

        for (const cat of raw) {
            const fileRef = storageRef(storage, `category-images/${cat.image}`)
            cat.imageUrl = await getDownloadURL(fileRef)
        }

        this.categories = raw.sort((a, b) => a.order - b.order)

        console.log(this.categories)
    }
}
</script>
<style scoped>
.is-clickable {
    cursor: pointer;
    transition: transform 0.1s ease;
}
.is-clickable:hover {
    transform: scale(1.02);
}
</style>