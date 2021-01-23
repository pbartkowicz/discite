import { RouteConfig, Route } from 'vue-router'

import { UserState } from '@/router/user-state'
import Home from '@/views/Home.vue'

const routes: Array<RouteConfig> = [
    { path: '/', name: 'home', component: Home },
    { path: '/auth', name: 'auth', component: () => import('@/views/Auth.vue'), meta: { state: UserState.Guest } },

    // Account
    { path: '/account', name: 'account', component: () => import('@/views/account/Account.vue'), meta: { state: UserState.LoggedIn } },
    { path: '/account/edit', name: 'account.edit', component: () => import('@/views/account/EditAccount.vue'), meta: { state: UserState.LoggedIn } },
    { path: '/account/password', name: 'account.password', component: () => import('@/views/account/ChangePassword.vue'), meta: { state: UserState.LoggedIn } },

    // Test
    {
        path: '/test/solve/:id([0-9]+)?',
        name: 'test.solve',
        component: () => import('@/views/test/SolveTest.vue'),
        props: (route: Route) => {
            const id = route.params.id as (string | undefined)

            return {
                id: id === undefined ? undefined : parseInt(id, 10)
            }
        }
    },
    { path: '/test/results', name: 'test.results', component: () => import('@/views/test/TestResults.vue') },

    { path: '/test/create', name: 'test.create', component: () => import('@/views/test/create-test/CreateTest.vue'), meta: { state: UserState.LoggedIn } }
]

export {
    routes as default
}
