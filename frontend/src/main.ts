import axios from 'axios'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import Vue from 'vue'
import { config } from 'vuex-module-decorators'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import vuetify from '@/plugins/vuetify'
import Env from '@/env'

// Remove Vue production tip
Vue.config.productionTip = false

// Force all @Action decorators to have rawError parameter set to true
config.rawError = true

// Configure axios
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.baseURL = Env.apiBaseUrl

// Configure validation
Vue.component('validation-observer', ValidationObserver)
Vue.component('validation-provider', ValidationProvider)
extend('required', required)

// Init Vue
new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
