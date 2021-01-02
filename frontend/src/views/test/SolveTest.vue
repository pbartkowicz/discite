<template>
    <v-container>
        <v-row>
            <test cols="12"
                  lg="8" />

            <v-col cols="12"
                   lg="4">
                <test-stats />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'

    import Test from '@/components/test/Test.vue'
    import TestStats from '@/components/test/TestStats.vue'

    @Component({
        components: { Test, TestStats }
    })
    export default class SolveTest extends Vue {

    }
</script>