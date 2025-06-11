import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Admin from '../views/admin/Admin.vue'
import AdminUpload from '../views/admin/Upload.vue'
import AdminEdit from '../views/admin/Edit.vue'
import AdminOther from '../views/admin/Other.vue'


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
			component: Admin,
			children: [
				{
					path: '',
      				redirect: '/admin/upload'
				},
				{
					path: 'upload',
      				component: AdminUpload
				},
				{
					path: 'edit',
      				component: AdminEdit
				},
				{
					path: 'other',
      				component: AdminOther
				}
			]
		}
  	]
})

export default router