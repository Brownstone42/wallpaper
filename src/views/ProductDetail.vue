<template>
    <section class="section">
        <div class="container">
            <div class="columns is-multiline is-variable is-6">

                <!-- LEFT: Preview -->
                <div class="column is-full-mobile is-half-tablet is-three-fifths-desktop">
                    <div class="product-preview">
                        <div class="iphone-frame">
                            <div class="notch"></div>
                            <video :src="product.video" muted autoplay playsinline loop class="video-preview"></video>
                        </div>
                    </div>
                </div>

                <!-- RIGHT: Info -->
                <div class="column is-full-mobile is-half-tablet is-two-fifths-desktop">
                    
                </div>

                
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'ProductDetail',
    computed: {
        productId() {
            return this.$route.params.id
        }
    }
}
</script>