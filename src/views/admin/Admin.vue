<template>
    <section class="section">
        <div class="container">
            <h1 class="title">Admin Panel<span v-if="currentSubpageTitle"> : {{ currentSubpageTitle }}</span></h1>

            <!-- Sub-navigation -->
            <div class="tabs is-toggle is-toggle-rounded is-fullwidth">
                <ul class="admin-tabs">
                    <li :class="{ 'is-active': $route.path.includes('/admin/upload') }">
                        <router-link to="/admin/upload">Upload</router-link>
                    </li>
                    <li :class="{ 'is-active': $route.path.includes('/admin/edit') }">
                        <router-link to="/admin/edit">Edit</router-link>
                    </li>
                    <li :class="{ 'is-active': $route.path.includes('/admin/other') }">
                        <router-link to="/admin/other">Other</router-link>
                    </li>
                </ul>
            </div>

            <!-- Route outlet for sub-pages -->
            <router-view />
        </div>
    </section>
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
    },
    computed: {
        currentSubpageTitle() {
            const map = {
                '/admin/upload': 'Upload',
                '/admin/edit': 'Edit',
                '/admin/other': 'Other'
            }
            return map[this.$route.path] || ''
        }
    }
}
</script>
<style scoped>
.admin-tabs {
    display: flex;
    justify-content: space-between;
}

.admin-tabs li {
    flex: 1;
    text-align: center;
}
</style>