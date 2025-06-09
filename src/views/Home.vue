<template>
    <section class="section">
        <div class="container">
            <CategoryMenu :categories="categories" @select-category="selectCategory" />

            <div v-if="selectedCategory" class="mt-5">
                <h3 class="title is-4 has-text-centered">
                    {{ selectedCategory.name }} Items
                </h3>

                <div class="columns is-multiline is-centered">
                    <router-link :to="`/product/${item.id}`" class="column is-one-quarter p-0" v-for="(item, index) in selectedCategory.items" :key="index">
                        <VideoCard :title="item.title" :video="item.video" :compatibility="item.compatibility" :price="item.price" />
                    </router-link>                    
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import CategoryMenu from '../components/CategoryMenu.vue'
import VideoCard from '../components/VideoCard.vue'
//import { db } from '@/firebase'

//console.log('Firestore DB:', db)

export default {
    name: 'Home',
    components: {
        CategoryMenu,
        VideoCard
    },
    watch: {
        selectedCategory() {
            this.$nextTick(() => {
                this.initIntersectionObserver()
            })
        }
    },
    data() {
        return {
            selectedCategory: null,
            categories: [
                {
                    id: 1,
                    name: 'Cat',
                    image: 'https://placedog.net/400/300',
                    items: [
                        {
                            id: 'cat-in-space',
                            title: 'Cat Case 1',
                            video: '/videos/test01.mp4',
                            compatibility: '16, 16pm',
                            price: 1090
                        },
                        {
                            title: 'Cat Case 2',
                            video: 'https://www.w3schools.com/html/mov_bbb.mp4'
                        },
                        {
                            title: 'Cat Case 3',
                            video: 'https://www.w3schools.com/html/mov_bbb.mp4'
                        },
                        {
                            title: 'Cat Case 4',
                            video: 'https://www.w3schools.com/html/mov_bbb.mp4'
                        },
                        {
                            title: 'Cat Case 5',
                            video: 'https://www.w3schools.com/html/mov_bbb.mp4'
                        },
                        {
                            title: 'Cat Case 6',
                            video: 'https://www.w3schools.com/html/mov_bbb.mp4'
                        },
                        {
                            title: 'Cat Case 7',
                            video: 'https://www.w3schools.com/html/mov_bbb.mp4'
                        },
                        {
                            title: 'Cat Case 8',
                            video: 'https://www.w3schools.com/html/mov_bbb.mp4'
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'Dog',
                    image: 'https://placedog.net/400/300',
                    items: [
                        {
                            title: 'Dog Case 1',
                            video: 'https://www.w3schools.com/html/mov_bbb.mp4'
                        }
                    ]
                },
                {
                    id: 3,
                    name: 'Tech',
                    image: 'https://placedog.net/400/300',
                    items: [
                        {
                            title: 'Tech Case 1',
                            video: 'https://www.w3schools.com/html/movie.mp4'
                        }
                    ]
                },
                {
                    id: 4,
                    name: 'Nature',
                    image: 'https://placedog.net/400/300',
                    items: []
                }
            ]
        }
    },
    methods: {
        selectCategory(category) {
            this.selectedCategory = category
        },
        initIntersectionObserver() {
            const options = {
                root: null,
                threshold: 1.0
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    //console.log('isIntersecting:', entry.isIntersecting, 'intersectionRatio:', entry.intersectionRatio)
                    const video = entry.target

                    if (entry.isIntersecting) {
                        video.play().catch(() => {})
                    } else {
                        video.pause()
                    }
                })
            }, options)

            const videoEls = this.$refs.videoRefs

            if (Array.isArray(videoEls)) {
                videoEls.forEach((video) => observer.observe(video))
            } else if (videoEls) {
                observer.observe(videoEls)
            }
        }
    }
}
</script>

<style scoped>
.video-preview {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
</style>