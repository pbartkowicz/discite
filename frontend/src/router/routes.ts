import { RouteConfig } from 'vue-router'

import { UserState } from '@/router/user-state'
import Home from '@/views/Home.vue'

const routes: Array<RouteConfig> = [
    { path: '/', name: 'home', component: Home },
    { path: '/auth', name: 'auth', component: () => import('@/views/Auth.vue'), meta: { state: UserState.Guest } },

    { path: '/account', name: 'account', component: () => import('@/views/account/Account.vue'), meta: { state: UserState.LoggedIn } },

    // Test
    { path: '/test/solve', name: 'test.solve', component: () => import('@/views/test/SolveTest.vue') },
    { path: '/test/results', name: 'test.results', component: () => import('@/views/test/TestResults.vue') },

    { path: '/test/create', name: 'test.create', component: () => import('@/views/test/create-test/CreateTest.vue'), meta: { state: UserState.LoggedIn } }
]

export {
    routes as default
}
