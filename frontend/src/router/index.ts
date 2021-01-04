import Vue from 'vue'
import VueRouter from 'vue-router'

import Routes from '@/router/routes'

import { redirectIfNotAuthenticated } from '@/router/guards/redirect-if-not-authenticated'
import { waitForStore } from '@/router/guards/wait-for-store'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: Routes
})

router.beforeEach(waitForStore)
router.beforeEach(redirectIfNotAuthenticated)

export {
    router as default
}
