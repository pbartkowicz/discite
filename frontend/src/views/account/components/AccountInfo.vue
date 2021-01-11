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
                   :to="{ name: 'account.edit' }">
                Edit data
            </v-btn>
            <v-btn text
                   :to="{ name: 'account.password' }">
                Change password
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'

    @Component
    export default class Account extends Vue {
        get username (): string {
            return 'magiczne'
        }

        get email (): string {
            return 'magiczne@discite.com'
        }
    }
</script>