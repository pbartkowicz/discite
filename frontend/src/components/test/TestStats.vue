<template>
    <v-card>
        <v-card-title>Stats</v-card-title>

        <v-card-text>
            <ul>
                <li>Correct: {{ testsModule.testResults.correct }}</li>
                <li>Partially correct: {{ testsModule.testResults.partiallyCorrect }}</li>
                <li>Wrong: {{ testsModule.testResults.wrong }}</li>
            </ul>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { getModule } from 'vuex-module-decorators'

    import TestModule from '@/store/modules/test'

    @Component
    export default class TestQuestionBadge extends Vue {
        testsModule = getModule(TestModule, this.$store)
    }
</script>