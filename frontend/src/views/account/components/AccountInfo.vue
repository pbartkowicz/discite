<template>
    <v-card>
        <v-card-title>Account info</v-card-title>

        <v-card-text>
            <v-list>
                <v-list-item>
                    <v-list-item-title>Username</v-list-item-title>
                    <v-list-item-subtitle>{{ username }}</v-list-item-subtitle>
                </v-list-item>

                <v-list-item>
                    <v-list-item-title>Email</v-list-item-title>
                    <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
                </v-list-item>
            </v-list>
        </v-card-text>

        <v-card-actions class="justify-end">
            <v-btn text
                   color="amber"
                   :to="{ name: 'account.edit' }">
                Edit data
            </v-btn>
            <v-btn text
                   color="primary"
                   :to="{ name: 'account.password' }">
                Change password
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { getModule } from 'vuex-module-decorators'

    import UserModule from '@/store/modules/user'

    @Component
    export default class AccountInfo extends Vue {
        userModule = getModule(UserModule, this.$store)

        get username (): string {
            return this.userModule.nickname
        }

        get email (): string {
            return this.userModule.email
        }
    }
</script>