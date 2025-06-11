<template>
    <section class="section">
        <div class="container">
            <CategoryMenu :categories="categories" @select-category="selectCategory" />

            <div v-if="selectedCategory" class="mt-5">
                <h3 class="title is-4 has-text-centered">
                    {{ selectedCategory.name }} Items
                </h3>

                <div class="columns is-multiline is-centered">
                    <router-link
                        :to="`/product/${item.id}`"
                        class="column is-one-quarter p-0"
                        v-for="(item, index) in videos"
                        :key="index"
                    >
                        <VideoCard
                            :title="item.title"
                            :video="item.showVideo"
                            :compatibility="item.compatibility"
                            :price="item.price"
                        />
                    </router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import CategoryMenu from '../components/CategoryMenu.vue'
import VideoCard from '../components/VideoCard.vue'
import { useCategoryStore } from '@/stores/category'
import { useVideoStore } from '@/stores/video'

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
    mounted() {
        this.categoryStore.loadCategories()
    },
    data() {
        return {
            selectedCategory: null,
        }
    },
    computed: {
        categoryStore() {
            return useCategoryStore()
        },
        videoStore() {
            return useVideoStore()
        },
        categories() {
            return this.categoryStore.categories
        },
        videos() {
            console.log(this.videoStore.getVideosByCategory(this.selectedCategory?.id))
            return this.videoStore.getVideosByCategory(this.selectedCategory?.id)
        }
    },
    methods: {
        async selectCategory(category) {
            this.selectedCategory = category
            await this.videoStore.fetchVideosByCategory(category.id)
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