<template>
    <div class="container">
        <h1 class="title">Admin Panel</h1>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth'

export default {
    async created() {
        const authStore = useAuthStore()
        await authStore.fetchUserOnStart()

        if (!authStore.user || authStore.userData?.role !== 'admin') {
            this.$router.push('/')
        }
    }
}
</script>