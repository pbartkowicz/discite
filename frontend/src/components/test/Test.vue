<template>
    <v-row>
        <v-col cols="12"
               lg="8">
            <test-question :answers="answers"
                           :checked.sync="checked"
                           :question="testModule.currentQuestion"
                           :revealed.sync="revealed"
                           @check="onQuestionCheck">
                <template #buttons>
                    <template v-if="checked">
                        <v-btn v-if="!testModule.isLastQuestion"
                               block
                               color="primary"
                               @click="onNextQuestion">
                            Next question
                        </v-btn>
                        <v-btn v-else
                               block
                               class="white--text"
                               color="green"
                               :to="{ name: 'test.results' }">
                            See your results
                        </v-btn>
                    </template>
                </template>
            </test-question>

            <v-fade-transition>
                <test-question-tips v-show="revealed"
                                    :question="testModule.currentQuestion" />
            </v-fade-transition>
        </v-col>

        <v-col cols="12"
               lg="4">
            <test-stats />
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { getModule } from 'vuex-module-decorators'

    import TestQuestion from '@/components/test/TestQuestion.vue'
    import TestQuestionTips from '@/components/test/TestQuestionTips.vue'
    import TestStats from '@/components/test/TestStats.vue'

    import TestModule from '@/store/modules/test'

    @Component({
        components: { TestQuestion, TestQuestionTips, TestStats }
    })
    export default class Test extends Vue {
        testModule = getModule(TestModule, this.$store)

        answers: Array<number> = []

        // region Store mappings

        get checked (): boolean {
            return this.testModule.checked
        }

        set checked (value: boolean) {
            this.testModule.setChecked(value)
        }

        get revealed (): boolean {
            return this.testModule.revealed
        }

        set revealed (value: boolean) {
            this.testModule.setRevealed(value)
        }

        // endregion

        onQuestionCheck (answers: Array<number>, correct: boolean, partiallyCorrect: boolean): void {
            this.answers = answers
            this.testModule.updateTestsResults({
                answers,
                correct,
                partiallyCorrect
            })
        }

        onNextQuestion (): void {
            if (!this.testModule.isLastQuestion) {
                this.answers = []
                this.testModule.nextQuestion()
            }
        }
    }
</script>