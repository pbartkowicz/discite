<template>
    <v-container>
        <h4 class="text-center">Create a new test</h4>

        <v-row>
            <v-col cols="12"
                   lg="4">

            </v-col>

            <v-col cols="12"
                   lg="8">

            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { getModule } from 'vuex-module-decorators'

    @Component
    export default class CreateTest extends Vue {

    }
</script>