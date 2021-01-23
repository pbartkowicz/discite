import localforage from 'localforage'
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import AuthModule from '@/store/modules/auth'
import ErrorsModule from '@/store/modules/errors'
import TestModule from '@/store/modules/test'

import { StoreState } from '@/store/types'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence<StoreState>({
    asyncStorage: true,
    reducer: (state: StoreState) => ({
        auth: {
            accessToken: state.auth.accessToken,
            refreshToken: state.auth.refreshToken
        }
    }),
    storage: localforage
})

export default new Vuex.Store<StoreState>({
    modules: {
        auth: AuthModule,
        errors: ErrorsModule,
        test: TestModule
    },
    plugins: [ vuexLocal.plugin ],
    strict: process.env.NODE_ENV === 'development'
})
