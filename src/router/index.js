import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFoundView.vue'

Vue.use(VueRouter)

// TODO: Add a route for the mobile app guide
const router = new VueRouter({
	mode: 'history',
	base: import.meta.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '*',
			name: '404',
			component: NotFoundView,
		},
		{
			path: '/about',
			name: 'about',
			component: () => import('../views/AboutView.vue'),
		},
		{
			path: '/requirements',
			name: 'requirements',
			component: () => import('../views/RequirementsView.vue'),
		},
		{
			path: '/settings',
			name: 'settings',
			component: () => import('../views/SettingsView.vue'),
		},
	],
})

export default router
