<template>
    <v-container fill-height>
        <v-row>
            <v-col md="6"
                   lg="4"
                   offset-lg="2">
                <v-form @submit="signIn">
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
                <!-- TODO: Wire this up -->
                <v-form>
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
                                  type="password" />
                </v-form>
            </v-col>
        </v-row>
        <v-row>
            <v-col md="6"
                   lg="4"
                   offset-lg="2">
                <v-btn block
                       color="primary"
                       @click="signIn">
                    Sign in
                </v-btn>
            </v-col>
           <v-col md="6"
                  lg="4">
                <v-btn block
                       color="primary">
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
            await this.authModule.obtainToken()
            await this.$router.push({ name: 'home' })
        }
    }
</script>