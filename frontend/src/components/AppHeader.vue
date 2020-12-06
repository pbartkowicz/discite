<template>
    <v-app-bar app
               color="primary"
               dark>
        <router-link :to="{ name: 'home' }">
            <v-toolbar-title class="white--text">Discite</v-toolbar-title>
        </router-link>

        <v-spacer />

        <v-divider class="mx-2 my-auto"
                   vertical />

        <template v-if="isLoggedIn">
            <v-tooltip bottom>
                <template #activator="{ attrs, on }">
                    <v-btn v-bind="attrs"
                           v-on="on"
                           icon>
                        <v-icon>mdi-account-circle-outline</v-icon>
                    </v-btn>
                </template>

                User account
            </v-tooltip>
        </template>
        <template v-else>
            <v-btn text
                   :to="{ name: 'auth' }">
                Sign in / Sign up
            </v-btn>
        </template>
    </v-app-bar>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { getModule } from 'vuex-module-decorators'

    import AuthModule from '@/store/modules/auth'

    @Component
    export default class AppHeader extends Vue {
        authModule = getModule(AuthModule, this.$store)

        get isLoggedIn (): boolean {
            return this.authModule.isLoggedIn
        }
    }
</script>