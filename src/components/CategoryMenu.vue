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
import { useCategoryStore } from '@/stores/category'

export default {
    name: 'CategoryMenu',
    data() {
        return {
            store: useCategoryStore()
        }
    },
    created() {
        if (this.store.categories.length === 0) {
            this.store.loadCategories()
        }
    },
    computed: {
        categories() {
            //console.log(this.store.categories)
            return this.store.categories
        }
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