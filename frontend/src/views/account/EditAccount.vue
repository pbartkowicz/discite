<template>
    <v-container>
        <v-row>
            <v-col cols="12"
                   lg="6"
                   offset-lg="3">
                <h4 class="text-h4 text-center">Edit account information</h4>

                <validation-observer v-slot="{ handleSubmit, valid }">
                    <v-form>
                        <validation-provider v-slot="{ errors }"
                                             name="Nickname"
                                             rules="required|min:6">
                            <v-text-field v-model="nickname"
                                          label="Nickname"
                                          prepend-icon="mdi-account-outline"
                                          :error-messages="errors"
                                          @keydown.enter="handleSubmit(onEditAccount)" />
                        </validation-provider>

                        <v-btn block
                               color="primary"
                               :disabled="!valid"
                               @click="handleSubmit(onEditAccount)">
                            Save
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

    import ErrorsModule from '@/store/modules/errors'
    import UserModule from '@/store/modules/user'

    @Component
    export default class ChangePassword extends Vue {
        userModule = getModule(UserModule, this.$store)

        get nickname (): string {
            return this.userModule.nickname
        }

        set nickname (value: string) {
            this.userModule.setNickname(value)
        }

        async onEditAccount (): Promise<void> {
            await this.userModule.updateProfile()
            await getModule(ErrorsModule, this.$store).showError('Profile updated')
            await this.$router.push({
                name: 'account'
            })
        }
    }
</script>