import axios from 'axios'
import Vue from 'vue'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import vuetify from '@/plugins/vuetify'
import Env from '@/env'
import '@/error-handler'
import '@/validate'

// Remove Vue production tip
Vue.config.productionTip = false

// Configure axios
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.baseURL = Env.apiBaseUrl

// Init Vue
new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')