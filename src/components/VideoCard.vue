<template>
    <div class="card-wrapper">
        <div class="frame-wrapper mt-4">
            <div class="iphone-frame">
                <div class="notch"></div>
                <video ref="videoEl" :src="video" muted autoplay playsinline loop class="video-preview"></video>
            </div>
        </div>
        
        <!-- 💬 Details Below the Phone -->
        <div class="content mt-4" style="width: 100%">
            <p class="is-size-5 has-text-weight-semibold mb-1">{{ title }}</p>
            <p class="is-size-6 has-text-grey mb-1">iPhone : {{ compatibility?.join(', ') }}</p>
            <p class="is-size-5 has-text-weight-bold has-text-info">฿{{ formattedPrice }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VideoCard',
    props: {
        title: String,
        video: String,
        compatibility: Array,
        price: [String, Number]
    },
    mounted() {
        const options = {
            root: null,
            threshold: 1.0
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const video = this.$refs.videoEl

                if (!video) return

                if (entry.isIntersecting && entry.intersectionRatio === 1) {
                    video.play().catch(() => {})
                } else {
                    video.pause()
                }
            })
        }, options)

        observer.observe(this.$refs.videoEl)

        this._observer = observer
    },
    beforeUnmount() {
        if (this._observer && this.$refs.videoEl) {
            this._observer.unobserve(this.$refs.videoEl)
        }
    },
    computed: {
        formattedPrice() {
            return new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(this.price)
        }
    }
}
</script>

<style scoped>
.card-wrapper {
    background: linear-gradient(145deg, #f9f9f9, #e6e6e6); /* subtle gradient */
    padding: 1rem;
    border-radius: 12px;
    margin: 0 auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    cursor: pointer;
}
.frame-wrapper {
    position: relative;
    width: 60%;
}
.iphone-frame {
    position: relative;
    width: 100%;
    padding-top: 180%; /* 19.5:9 portrait */
    background: #000;
    border: 10px solid #222;
    border-radius: 28px;
    overflow: hidden;
    box-shadow: inset 0 0 0 2px #444;
}
.video-preview {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.notch {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 40%;
    height: 24px;
    background: #111;
    border-radius: 12px;
    z-index: 2;
}
</style>