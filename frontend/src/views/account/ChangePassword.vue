<template>
    <v-container>
        <v-row>
            <v-col cols="12"
                   lg="6"
                   offset-lg="3">
                <h4 class="text-h4 text-center">Change password</h4>

                <validation-observer v-slot="{ handleSubmit, valid }">
                    <v-form>
                        <validation-provider v-slot="{ errors }"
                                             rules="required">
                            <v-text-field v-model="oldPassword"
                                          label="Old password"
                                          prepend-icon="mdi-lock-open-outline"
                                          type="password"
                                          :error-messages="errors" />
                        </validation-provider>

                        <validation-provider v-slot="{ errors }"
                                             rules="required">
                            <v-text-field v-model="newPassword"
                                          label="New password"
                                          prepend-icon="mdi-lock-outline"
                                          type="password"
                                          :error-messages="errors" />
                        </validation-provider>

                        <validation-provider v-slot="{ errors }"
                                             rules="required">
                            <v-text-field v-model="newPasswordConfirmation"
                                          label="Confirm new password"
                                          prepend-icon="mdi-lock"
                                          type="password"
                                          :error-messages="errors"
                                          @keydown.enter="handleSubmit(onChangePassword)" />
                        </validation-provider>

                        <v-btn block
                               color="primary"
                               :disabled="!valid"
                               @click="handleSubmit(onChangePassword)">
                            Change password
                        </v-btn>
                    </v-form>
                </validation-observer>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { getModule } from 'vuex-module-decorators'

    import AccountService from '@/services/acccount-service'
    import ErrorsModule from '@/store/modules/errors'

    @Component
    export default class ChangePassword extends Vue {
        oldPassword = ''
        newPassword = ''
        newPasswordConfirmation = ''

        async onChangePassword (): Promise<void> {
            await AccountService.changePassword({
                // TODO: Structure
            })

            await getModule(ErrorsModule, this.$store).showError('Password changed')
            await this.$router.push({
                name: 'account'
            })
        }
    }
</script>