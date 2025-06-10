import 'bulma/css/bulma.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

authStore.fetchUserOnStart().then(() => {
    app.mount('#app')
})