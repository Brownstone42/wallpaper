import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Admin from '../views/Admin.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{ 
			path: '/product/:id', 
			name: 'ProductDetail', 
			component: ProductDetail 
		},
		{
			path: '/admin',
			name: 'Admin',
			component: Admin
		}
  	]
})

export default router