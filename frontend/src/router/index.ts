import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import { redirectIfNotAuthenticated } from '@/router/guards/redirect-if-not-authenticated'

import Home from '@/views/Home.vue'

Vue.use(VueRouter)

enum UserState {
    LoggedIn,
    Guest
}

const routes: Array<RouteConfig> = [
    { path: '/', name: 'home', component: Home },
    { path: '/auth', name: 'auth', component: () => import('@/views/Auth.vue'), meta: { state: UserState.Guest } },

    { path: '/account', name: 'account', component: () => import('@/views/Account.vue'), meta: { state: UserState.LoggedIn } }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach(redirectIfNotAuthenticated)

export {
    router as default,
    UserState
}
