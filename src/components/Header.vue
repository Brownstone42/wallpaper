<template>
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="/">
                <strong>Wallpaper</strong>
            </a>

            <a role="button" class="navbar-burger" :class="{ 'is-active': isActive }" @click="toggleMenu"
                aria-label="menu"
                aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div class="navbar-menu" :class="{ 'is-active': isActive }">
            <div class="navbar-start">
                <a class="navbar-item" href="#">Home</a>
                <a class="navbar-item" href="#">About</a>
            </div>

            <div class="navbar-end">
                <div class="navbar-item">Login</div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            isActive: false,
        }
    },
    methods: {
        toggleMenu() {
            this.isActive = !this.isActive
        }
    }
}
</script>