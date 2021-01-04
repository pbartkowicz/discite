<template>
    <v-container>
        <v-row>
            <v-col sm="12"
                   lg="8">
                <test-question-result :answers="testsModule.currentQuestionAnswers"
                                      :question="testsModule.currentQuestion">
                    <template #buttons>
                        <v-col cols="6">
                             <v-btn :disabled="testsModule.isFirstQuestion"
                                    block
                                    color="primary"
                                    @click="onPreviousQuestion">
                                Previous
                             </v-btn>
                        </v-col>
                        <v-col cols="6">
                            <v-btn :disabled="testsModule.isLastQuestion"
                                   block
                                   color="primary"
                                   @click="onNextQuestion">
                                Next
                            </v-btn>
                        </v-col>
                    </template>
                </test-question-result>

                <v-fade-transition>
                    <test-question-tips v-show="testsModule.currentQuestion.hasTips"
                                        :question="testsModule.currentQuestion" />
                </v-fade-transition>
            </v-col>

            <v-col sm="12"
                   lg="4">
                <test-stats />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { getModule } from 'vuex-module-decorators'

    import TestQuestionResult from '@/components/test/TestQuestionResult.vue'
    import TestStats from '@/components/test/TestStats.vue'

    import TestModule from '@/store/modules/test'
    import TestQuestionTips from '@/components/test/TestQuestionTips.vue'

    @Component({
        components: { TestQuestionTips, TestQuestionResult, TestStats }
    })
    export default class TestResults extends Vue {
        testsModule = getModule(TestModule, this.$store)

        onPreviousQuestion (): void {
            if (!this.testsModule.isFirstQuestion) {
                this.testsModule.decrementCurrentQuestion()
            }
        }

        onNextQuestion (): void {
            if (!this.testsModule.isLastQuestion) {
                this.testsModule.incrementCurrentQuestion()
            }
        }
    }
</script>