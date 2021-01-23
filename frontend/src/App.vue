<template>
    <v-app>
        <!-- TODO: Show if app offline -->
        <app-status-bar v-if="false" />

        <app-header />

        <v-main>
            <v-fade-transition mode="out-in">
                <router-view />
            </v-fade-transition>
        </v-main>

        <app-footer />

        <v-snackbar v-model="errorsModule.hasError">
            <span v-html="errorsModule.error" />
        </v-snackbar>
    </v-app>
</template>

<script lang="ts">
    import axios from 'axios'
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { getModule } from 'vuex-module-decorators'

    import AppFooter from '@/components/AppFooter.vue'
    import AppHeader from '@/components/AppHeader.vue'
    import AppStatusBar from '@/components/AppStatusBar.vue'

    import AuthModule from '@/store/modules/auth'
    import ErrorsModule from '@/store/modules/errors'

    @Component({
        components: { AppFooter, AppHeader, AppStatusBar }
    })
    export default class App extends Vue {
        errorsModule = getModule(ErrorsModule, this.$store)

        async mounted (): Promise<void> {
            await getModule(AuthModule, this.$store).checkToken()

            // Fix for not adding authorization header on reload
            await (this.$store as any).restored
            const authModule = getModule(AuthModule, this.$store)
            axios.defaults.headers.common.Authorization = `Bearer ${authModule.accessToken}`
        }
    }
</script>