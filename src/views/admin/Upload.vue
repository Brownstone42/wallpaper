<template>
    <section class="section">
        <div class="container">
            <div class="columns">

                <!-- 📁 Left: Storage Videos -->
                <div class="column">
                    <h2 class="subtitle">Available Storage Videos</h2>
                    <ul>
                        <li v-for="video in videoStore.storageVideos" :key="video">{{ video }}</li>
                    </ul>
                </div>

                <!-- 📄 Right: Firestore Documents -->
                <div class="column">
                    <h2 class="subtitle">Existing Video Documents</h2>
                    <ul>
                        <li v-for="doc in videoStore.videoDocs" :key="doc.id"
                            :style="{ backgroundColor: doc.id === highlightedDocId ? '#ffd' : '' }"
                        >
                            {{ doc.title }} ({{ doc.id }})
                        </li>
                    </ul>
                </div>

            </div>

            <hr>

            <!-- 🎛️ Form Controls -->
            <div>
                <h2 class="subtitle">Upload / Add Variant</h2>

                <div class="field">
                    <label class="checkbox">
                        <input type="checkbox" v-model="useExistingVideo"> Use Existing Video
                    </label>
                </div>
            </div>
            
            <div class="field" v-if="useExistingVideo">
                <label class="label">Select Video</label>
                <div class="control">
                    <div class="select">
                        <select v-model="form.video">
                            <option disabled value="">-- Select --</option>
                            <option v-for="v in videoStore.storageVideos" :key="v" :value="'videos/' + v">{{ v }}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="field" v-else>
                <label class="label">Upload New Video</label>
                <input type="file" class="input" @change="handleFileUpload">
            </div>

            <div class="field">
                <label class="checkbox">
                    <input type="checkbox" v-model="addingVariant"> Add Variant to Existing Video
                </label>
            </div>

            <div class="field" v-if="addingVariant">
                <label class="label">Select Existing Video Document</label>
                <div class="select">
                    <select v-model="selectedDocId">
                        <option disabled value="">-- Select --</option>
                        <option v-for="doc in videoStore.videoDocs" :key="doc.id" :value="doc.id">{{ doc.title }}</option>
                    </select>
                </div>
            </div>

            <!-- 📝 Input Fields -->
            <div class="field">
                <label class="label">Title</label>
                <input class="input" v-model="form.title" :disabled="addingVariant">
            </div>

            <div class="field">
                <label class="label">Category</label>
                <div class="select">
                    <select v-model="form.categoryId" :disabled="addingVariant">
                        <option disabled value="">-- Select --</option>
                        <option v-for="cat in videoStore.categories" :key="cat.id" :value="cat.id">
                            {{ cat.name }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="field">
                <label class="label">Compatibility</label>
                <div class="buttons">
                    <button
                        v-for="version in compatibilityOptions"
                        :key="version"
                        class="button is-small"
                        :class="{ 'is-info': form.compatibility.includes(version) }"
                        :disabled="addingVariant"
                        @click.prevent="toggleCompatibility(version)"
                    >
                    {{ version }}
                    </button>
                </div>
            </div>

            <div class="field">
                <label class="label">Price</label>
                <input class="input" type="number" v-model.number="form.price" :disabled="addingVariant">
            </div>

            <div class="field">
                <label class="label">Variant Label</label>
                <input class="input" v-model="form.label">
            </div>

            <div class="field">
                <label class="label">Color</label>
                <input class="input" v-model="form.color">
            </div>

            <div class="field">
                <button class="button is-primary" @click="handleSubmit">Submit</button>
            </div>
        </div>
    </section>
</template>

<script>
import { useVideoStore } from '@/stores/video'
import { useAuthStore } from '@/stores/auth'

export default {
    name: 'Admin',
    mounted() {
        this.videoStore.fetchStorageVideos()
        this.videoStore.fetchVideoDocs()
        this.videoStore.fetchCategories()
    },
    async created() {
        const authStore = useAuthStore()
        await authStore.fetchUserOnStart()

        if (!authStore.user || authStore.userData?.role !== 'admin') {
            this.$router.push('/')
        }
    },
    data() {
        return {
            videoStore: useVideoStore(),
            useExistingVideo: true,
            addingVariant: false,
            selectedDocId: '',
            highlightedDocId: null,
            selectedDocData: null,
            compatibilityOptions: ['15', '15pm', '16', '16pm'],

            form: {
                title: '',
                categoryId: '',
                compatibility: [],
                price: 0,
                label: '',
                color: '',
                video: '',
                file: null
            }
        }
    },
    watch: {
        selectedDocId(newId) {
            if (this.addingVariant && newId) {
                this.loadSelectedDocData()
            }
        },
        addingVariant(val) {
            // Reset everything when toggled
            this.selectedDocId = ''
            this.form.title = ''
            this.form.categoryId = ''
            this.form.compatibility = []
            this.form.price = 0

            // Optional: reset variant-specific fields too
            this.form.label = ''
            this.form.color = ''
            this.form.file = null
        }
    },
    methods: {
        async loadSelectedDocData() {
            const selected = this.videoStore.videoDocs.find(doc => doc.id === this.selectedDocId)
            if (!selected) return

            this.form.title = selected.title
            this.form.categoryId = selected.categoryId
            this.form.compatibility = selected.compatibility
            this.form.price = selected.price
        },
        handleFileUpload(e) {
            this.form.file = e.target.files[0]
        },
        async handleSubmit() {
            let videoPath = this.form.video

            if (!this.useExistingVideo && this.form.file) {
                videoPath = await this.videoStore.uploadVideoFile(this.form.file)
            }

            let videoDocId = this.selectedDocId

            if (!this.addingVariant) {
                const docData = {
                    title: this.form.title,
                    categoryId: this.form.categoryId,
                    compatibility: this.form.compatibility,
                    price: this.form.price,
                    showVideo: videoPath
                }
                videoDocId = await this.videoStore.createVideoDoc(docData)
            }

            const isFirst = (await this.videoStore.getVariantCount(videoDocId)) === 0

            await this.videoStore.addVariant(videoDocId, {
                label: this.form.label,
                color: this.form.color,
                video: videoPath,
                default: isFirst
            })

            this.highlightedDocId = videoDocId
            await this.videoStore.fetchVideoDocs()
            this.resetForm()
            alert('Video or Variant added successfully!')
        },
        resetForm() {
            this.form = {
                title: '',
                categoryId: '',
                compatibility: [],
                price: 0,
                label: '',
                color: '',
                video: '',
                file: null
            }
            this.useExistingVideo = true
            this.addingVariant = false
            this.selectedDocId = ''
        },
        toggleCompatibility(version) {
            const index = this.form.compatibility.indexOf(version)

            if (index === -1) {
                this.form.compatibility.push(version)
            } else {
                this.form.compatibility.splice(index, 1)
            }
        }
    }
}
</script>