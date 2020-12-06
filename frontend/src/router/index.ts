import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    { path: '/', name: 'home', component: Home },
    { path: '/auth', name: 'auth', component: () => import('@/views/Auth.vue') }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
