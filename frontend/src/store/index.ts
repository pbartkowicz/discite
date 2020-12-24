import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import AuthModule from '@/store/modules/auth'
import TestModule from '@/store/modules/test'

import { StoreState } from '@/store/types'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence<StoreState>({
    modules: [ 'auth' ],
    storage: window.localStorage
})

export default new Vuex.Store<StoreState>({
    modules: {
        auth: AuthModule,
        test: TestModule
    },
    plugins: [ vuexLocal.plugin ],
    strict: process.env.NODE_ENV === 'development'
})
