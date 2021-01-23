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
                            <v-text-field v-model="nickname"
                                          label="Nickname"
                                          prepend-icon="mdi-account-online"
                                          :error-messages="errors"
                                          @keydown.enter="handleSubmit(onEditAccount)" />
                        </validation-provider>

                        <v-btn block
                               color="primary"
                               :disabled="!valid"
                               @click="handleSubmit(onEditAccount)">
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

    import AuthModule from '@/store/modules/auth'
    import ErrorsModule from '@/store/modules/errors'

    @Component
    export default class ChangePassword extends Vue {
        nickname = ''

        async onEditAccount (): Promise<void> {
            await AccountService.changeProfile({
                // TODO: Structure
            })

            await getModule(ErrorsModule, this.$store).showError('Profile updated')
            await this.$router.push({
                name: 'account'
            })
        }

        async created (): Promise<void> {
            // TODO: This should be auth module
            this.nickname = getModule(AuthModule, this.$store).login
        }
    }
</script>