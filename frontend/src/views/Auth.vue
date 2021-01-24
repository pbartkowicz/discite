<template>
    <v-container fill-height>
        <v-row>
            <v-col md="6"
                   lg="4"
                   offset-lg="2">
                <validation-observer v-slot="{ handleSubmit }"
                                     ref="signInObserver">
                    <v-form :disabled="isSigningUp"
                            @submit="signIn">
                        <h3 class="text-center">Sign in</h3>

                        <validation-provider v-slot="{ errors }"
                                             name="Login"
                                             rules="required|min:6">
                            <v-text-field v-model="signInLogin"
                                          label="Login"
                                          prepend-icon="mdi-account-outline"
                                          required
                                          :error-messages="errors" />
                        </validation-provider>

                        <validation-provider v-slot="{ errors }"
                                             name="Password"
                                             rules="required|min:6">
                            <v-text-field v-model="signInPassword"
                                          label="Password"
                                          prepend-icon="mdi-lock-outline"
                                          required
                                          type="password"
                                          :error-messages="errors"
                                          @keydown.enter="handleSubmit(signIn)" />
                        </validation-provider>
                    </v-form>
                </validation-observer>
            </v-col>
            <v-col md="6"
                   lg="4">
                <validation-observer v-slot="{ handleSubmit }"
                                     ref="signUpObserver">
                    <v-form :disabled="isSigningIn"
                            @submit="signUp">
                        <h3 class="text-center">Sign up</h3>

                        <validation-provider v-slot="{ errors }"
                                             name="Login"
                                             rules="required|min:6">
                            <v-text-field v-model="signUpLogin"
                                          label="Login"
                                          prepend-icon="mdi-account-outline"
                                          required
                                          :error-messages="errors" />
                        </validation-provider>

                        <validation-provider v-slot="{ errors }"
                                             name="Email"
                                             rules="required|email">
                            <v-text-field v-model="signUpEmail"
                                          label="Email"
                                          prepend-icon="mdi-e   mail-outline"
                                          required
                                          type="email"
                                          :error-messages="errors" />
                        </validation-provider>

                        <validation-provider v-slot="{ errors }"
                                             name="Password"
                                             rules="required|min:6">
                            <v-text-field v-model="signUpPassword"
                                          label="Password"
                                          prepend-icon="mdi-lock-outline"
                                          required
                                          type="password"
                                          :error-messages="errors"
                                          @keydown.enter="handleSubmit(signUp)" />
                        </validation-provider>
                    </v-form>
                </validation-observer>
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
    import { ValidationObserver } from 'vee-validate'
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { Watch } from 'vue-property-decorator'
    import { getModule } from 'vuex-module-decorators'

    import AuthModule from '@/store/modules/auth'
    import SignUpModule from '@/store/modules/signup'
    import UserModule from '@/store/modules/user'

    @Component
    export default class Auth extends Vue {
        authModule = getModule(AuthModule, this.$store)
        signUpModule = getModule(SignUpModule, this.$store)
        userModule = getModule(UserModule, this.$store)
        isSigningIn = false
        isSigningUp = false

        canSignIn = false
        canSignUp = false

        $refs!: {
            signInObserver: InstanceType<typeof ValidationObserver>,
            signUpObserver: InstanceType<typeof ValidationObserver>
        }

        // region Sign in field mappings

        get signInLogin (): string {
            return this.authModule.login
        }

        set signInLogin (value: string) {
            this.authModule.setLogin(value)
        }

        get signInPassword (): string {
            return this.authModule.password
        }

        set signInPassword (value: string) {
            this.authModule.setPassword(value)
        }

        // endregion

        // region Sign up field mappings

        get signUpLogin (): string {
            return this.signUpModule.login
        }

        set signUpLogin (value: string) {
            this.signUpModule.setLogin(value)
        }

        get signUpEmail (): string {
            return this.signUpModule.email
        }

        set signUpEmail (value: string) {
            this.signUpModule.setEmail(value)
        }

        get signUpPassword (): string {
            return this.signUpModule.password
        }

        set signUpPassword (value: string) {
            this.signUpModule.setPassword(value)
        }

        // endregion

        async signIn (): Promise<void> {
            this.isSigningIn = true

            try {
                await this.authModule.obtainToken()
            } finally {
                try {
                    await this.userModule.load()
                } finally {
                    this.isSigningIn = false
                }
            }

            await this.$router.push({ name: 'home' })
        }

        async signUp (): Promise<void> {
            this.isSigningUp = true

            try {
                await this.signUpModule.signUp()
            } finally {
                try {
                    this.signInLogin = this.signUpLogin
                    this.signInPassword = this.signUpPassword

                    await this.authModule.obtainToken()
                } finally {
                    this.signUpModule.clear()

                    try {
                        await this.userModule.load()
                    } finally {
                        this.isSigningUp = false
                    }
                }
            }

            await this.$router.push({ name: 'home' })
        }
    }
</script>