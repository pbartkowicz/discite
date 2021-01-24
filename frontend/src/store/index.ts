import localforage from 'localforage'
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import AuthModule from '@/store/modules/auth'
import ErrorsModule from '@/store/modules/errors'
import SignUpModule from '@/store/modules/signup'
import TestModule from '@/store/modules/test'
import UserModule from '@/store/modules/user'

import { PartialStoreState, StoreState } from '@/store/types'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence<StoreState>({
    asyncStorage: true,
    reducer: (state: StoreState): PartialStoreState => ({
        auth: {
            accessToken: state.auth.accessToken,
            refreshToken: state.auth.refreshToken
        },
        user: {
            email: state.user.email,
            nickname: state.user.nickname
        }
    }),
    storage: localforage
})

export default new Vuex.Store<StoreState>({
    modules: {
        auth: AuthModule,
        errors: ErrorsModule,
        signup: SignUpModule,
        test: TestModule,
        user: UserModule
    },
    plugins: [ vuexLocal.plugin ],
    strict: process.env.NODE_ENV === 'development'
})
