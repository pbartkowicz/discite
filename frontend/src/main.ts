import Vue from 'vue'
import { config } from 'vuex-module-decorators'

import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

// Force all @Action decorators to have rawError parameter set to true
config.rawError = true

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
