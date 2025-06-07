<template>
    <section class="section">
        <div class="container">
            <h2 class="title is-4 has-text-centered">Select a Category</h2>

            <div class="columns is-multiline is-centered">
                <div class="column is-one-quarter" v-for="category in categories" :key="category.id">
                    <div class="box has-text-centered" @click="$emit('select-category', category)">
                        <p class="title is-5">{{ category.name }}</p>
                        <figure class="image is-4by3">
                            <img :src="category.image" alt="Category" />
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'CategoryMenu',
    props: ['categories'],
    /*data() {
        return {
            categories: [
                {
                    id: 1,
                    name: 'Cat',
                    image: 'https://placedog.net/400/300'
                },
                {
                    id: 2,
                    name: 'Dog',
                    image: 'https://placedog.net/400/300'
                },
                {
                    id: 3,
                    name: 'Tech',
                    image: 'https://placedog.net/400/300'
                },
                {
                    id: 4,
                    name: 'Nature',
                    image: 'https://placedog.net/400/300'
                }
            ]
        }
    }*/
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