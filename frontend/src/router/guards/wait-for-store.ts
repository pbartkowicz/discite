import { Store as VuexStore } from 'vuex'
import { NavigationGuardNext, Route } from 'vue-router'

import Store from '@/store'
import { StoreState } from '@/store/types'

const waitForStore = async (to: Route, from: Route, next: NavigationGuardNext) => {
    await (Store as VuexStore<StoreState> & { restored: Promise<void> }).restored

    next()
}

export {
    waitForStore
}
