import Vue from 'vue'
import Vuex from 'vuex'

import AuthModule from '@/store/modules/auth'

import { StoreState } from '@/store/types'

Vue.use(Vuex)

export default new Vuex.Store<StoreState>({
    modules: {
        auth: AuthModule
    },
    strict: process.env.NODE_ENV === 'development'
})
