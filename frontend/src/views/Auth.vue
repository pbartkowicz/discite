<template>
    <v-container fill-height>
        <v-row>
            <v-col md="6"
                   lg="4"
                   offset-lg="2">
                <v-form>
                    <h3 class="text-center">Sign in</h3>

                    <v-text-field v-model="email"
                                  label="Email"
                                  prepend-icon="mdi-email-outline"
                                  required
                                  type="email" />

                    <v-text-field v-model="password"
                                  label="Password"
                                  prepend-icon="mdi-lock-outline"
                                  required
                                  type="password" />
                </v-form>
            </v-col>
            <v-col md="6"
                   lg="4">
                <v-form>
                    <h3 class="text-center">Sign up</h3>

                    <v-text-field label="Email"
                                  prepend-icon="mdi-email-outline"
                                  required
                                  type="email" />

                    <v-text-field label="Password"
                                  prepend-icon="mdi-lock-outline"
                                  required
                                  type="password" />

                    <v-text-field label="Password confirmation"
                                  prepend-icon="mdi-lock-check-outline"
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

        get email (): string {
            return this.authModule.email
        }

        set email (value: string) {
            this.authModule.setEmail(value)
        }

        get password (): string {
            return this.authModule.password
        }

        set password (value: string) {
            this.authModule.setPassword('value')
        }

        // endregion

        signIn (): void {
            this.authModule.obtainToken()
        }
    }
</script>