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
                    <div class="product-info">
                        <h1 class="title is-4 mb-2">{{ product.title }}</h1>
                        <p class="subtitle is-6 has-text-grey mb-1">iPhone: {{ product.compatibility }}</p>
                        <p class="is-size-5 has-text-weight-bold has-text-info mb-4">฿{{ formattedPrice }}</p>

                        <!-- Future: Variant Selection -->
                        <div class="mb-4">
                            <p class="mb-2">Variant:</p>
                            <label class="radio">
                                <input type="radio" name="variant" checked>
                                Default
                            </label>
                        </div>

                        <!-- Buy/Add to Cart -->
                        <div class="buttons">
                            <button class="button is-info is-fullwidth">Add to Cart</button>
                            <button class="button is-light is-fullwidth">Buy Now</button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'ProductDetail',
    data() {
        return {
            product: {
                id: this.$route.params.id,
                title: 'Cat in Space',
                video: '/videos/test01.mp4',
                compatibility: 'iPhone 16 Pro Max',
                price: 1090
            }
        }
    },
    computed: {
        formattedPrice() {
            return new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(this.product.price)
        }
    }
}
</script>

<style scoped>
.product-preview {
    max-width: 35%;
    margin: 0 auto;
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