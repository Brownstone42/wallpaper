<template>
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item">
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
                <a class="navbar-item" href="/">Home</a>
                <a class="navbar-item" href="#">About</a>
                <router-link v-if="userData?.role === 'admin'" class="navbar-item" to="/admin">
                    Admin
                </router-link>
            </div>

            <div class="navbar-end">
                <template v-if="user">
                    <div class="navbar-item">
                        {{ userData?.name }} ({{ userData?.credits ?? 0 }})
                    </div>
                    <a class="navbar-item" @click="handleLogout">Logout</a>
                </template>
                <a v-else class="navbar-item" @click="handleLogin">Login</a>
            </div>
        </div>
    </nav>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

export default {
    name: 'Header',
    setup() {
        const authStore = useAuthStore()
        const { user, userData } = storeToRefs(authStore)

        const handleLogin = () => authStore.loginWithGoogle()
        const handleLogout = () => authStore.logout()

        return {
            user,
            userData,
            handleLogin,
            handleLogout,
        }
    },
    data() {
        return {
            isActive: false
        }
    },
    methods: {
        toggleMenu() {
            this.isActive = !this.isActive
        }
    }
}
</script>