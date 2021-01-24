<template>
    <v-col>
        <template v-if="testModule.test.questions.length === 0">
            <v-card>
                <v-card-title class="justify-center">
                    This test has no questions. What?
                </v-card-title>
            </v-card>
        </template>
        <test-question v-else
                       :answers="answers"
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
                           @click="onSeeResults">
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
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { getModule } from 'vuex-module-decorators'

    import TestQuestion from '@/views/test/components/TestQuestion.vue'
    import TestQuestionTips from '@/views/test/components/TestQuestionTips.vue'

    import TestModule from '@/store/modules/test'
    import TestService from '@/services/test-service'

    @Component({
        components: { TestQuestion, TestQuestionTips }
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

        async onSeeResults (): Promise<void> {
            this.testModule.goToFirstQuestion()

            await TestService.submitResults(this.testModule.test.id, this.testModule.testResults)

            await this.$router.push({
                name: 'test.results'
            })
        }
    }
</script>