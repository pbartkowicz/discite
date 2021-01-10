<template>
    <v-container fill-height>
        <v-row>
            <v-col md="6"
                   lg="4"
                   offset-lg="2">
                <v-form :disabled="isSigningUp"
                        @submit="signIn">
                    <h3 class="text-center">Sign in</h3>

                    <v-text-field v-model="login"
                                  label="Login"
                                  prepend-icon="mdi-account-outline"
                                  required />

                    <v-text-field v-model="password"
                                  label="Password"
                                  prepend-icon="mdi-lock-outline"
                                  required
                                  type="password"
                                  @keydown.enter="signIn" />
                </v-form>
            </v-col>
            <v-col md="6"
                   lg="4">
                <v-form :disabled="isSigningIn"
                        @submit="signUp">
                    <h3 class="text-center">Sign up</h3>

                    <v-text-field label="Login"
                                  prepend-icon="mdi-account-outline"
                                  required />

                    <v-text-field label="Email"
                                  prepend-icon="mdi-email-outline"
                                  required
                                  type="email" />

                    <v-text-field label="Password"
                                  prepend-icon="mdi-lock-outline"
                                  required
                                  type="password"
                                  @keydown.enter="signUp" />
                </v-form>
            </v-col>
        </v-row>
        <v-row>
            <v-col md="6"
                   lg="4"
                   offset-lg="2">
                <v-btn block
                       color="primary"
                       :disabled="isSigningUp"
                       :loading="isSigningIn"
                       @click="signIn">
                    Sign in
                </v-btn>
            </v-col>
           <v-col md="6"
                  lg="4">
                <v-btn block
                       color="primary"
                       :disabled="isSigningIn"
                       :loading="isSigningUp"
                       @click="signUp">
                    Sign up
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { getModule } from 'vuex-module-decorators'

    import AuthModule from '@/store/modules/auth'

    @Component
    export default class Auth extends Vue {
        authModule = getModule(AuthModule, this.$store)
        isSigningIn = false
        isSigningUp = false

        // region Field mappings

        get login (): string {
            return this.authModule.login
        }

        set login (value: string) {
            this.authModule.setLogin(value)
        }

        get password (): string {
            return this.authModule.password
        }

        set password (value: string) {
            this.authModule.setPassword(value)
        }

        // endregion

        async signIn (): Promise<void> {
            this.isSigningIn = true

            try {
                await this.authModule.obtainToken()
            } finally {
                 this.isSigningIn = false
            }

            await this.$router.push({ name: 'home' })
        }

        async signUp (): Promise<void> {
            this.isSigningUp = true

            try {
                // TODO: Sign up for real
                await new Promise(resolve => setTimeout(resolve))
            } finally {
                this.isSigningUp = false
            }

            // await this.$router.push({ name: 'home' })
        }
    }
</script>