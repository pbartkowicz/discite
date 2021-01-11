<template>
    <validation-observer v-slot="{ handleSubmit, valid }">
        <v-form>
            <v-row>
                <v-col cols="12"
                       lg="4">
                    <v-card>
                        <v-card-title>Test basic info</v-card-title>

                        <v-card-text>
                            <validation-provider v-slot="{ errors }"
                                                 name="Name"
                                                 rules="required|max:191">
                                <v-text-field v-model="name"
                                              label="Name"
                                              prepend-icon="mdi-format-title"
                                              :error-messages="errors" />
                            </validation-provider>

                            <validation-provider v-slot="{ errors }"
                                                 name="Description"
                                                 rules="required">
                                <v-textarea v-model="description"
                                            label="Description"
                                            prepend-icon="mdi-text-subject"
                                            :error-messages="errors" />
                            </validation-provider>

                            <v-btn block
                                   class="mt-2"
                                   color="primary darken-2"
                                   :disabled="!valid"
                                   @click="handleSubmit(onSaveClicked)">
                                Save
                                <v-icon right>mdi-send</v-icon>
                            </v-btn>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="12"
                       lg="8">
                    <v-card>
                        <v-card-title>Questions</v-card-title>

                        <v-divider v-if="hasQuestions" />

                        <v-card-text>
                            <v-expansion-panels accordion
                                                focusable
                                                class="mb-8">
                                <v-expansion-panel v-for="(question, i) in test.questions"
                                                   :key="i">
                                    <v-expansion-panel-header>
                                        <template #default="{ open }">
                                            <v-row no-gutters>
                                                <v-col cols="4">
                                                    {{ question.question }}
                                                </v-col>

                                                <v-col class="text--secondary"
                                                       cols="8">
                                                    <v-fade-transition>
                                                        <v-row v-if="!open"
                                                               no-gutters>
                                                            <v-col cols="6">
                                                                {{ question.answers.length }} answers
                                                            </v-col>
                                                            <v-col cols="6">
                                                                {{ question.isMultipleChoice
                                                                    ? 'Multiple choice'
                                                                    : 'Single choice' }}
                                                            </v-col>
                                                        </v-row>
                                                    </v-fade-transition>
                                                </v-col>
                                            </v-row>
                                        </template>
                                    </v-expansion-panel-header>

                                    <v-expansion-panel-content>
                                        <validation-provider v-slot="{ errors }"
                                                             name="Question"
                                                             rules="required|max:191">
                                            <v-text-field v-model="test.questions[i].question"
                                                          class="mt-4"
                                                          label="Question"
                                                          prepend-icon="mdi-help"
                                                          :error-messages="errors" />
                                        </validation-provider>

                                        <v-row>
                                            <v-col cols="8">
                                                <v-text-field label="Number of answers"
                                                              min="2"
                                                              type="number"
                                                              :max="maxAnswers"
                                                              :prepend-icon="numberIcon(question)"
                                                              :value="question.answers.length"
                                                              @input="onNumberOfAnswersChanged(question, $event)" />
                                            </v-col>

                                            <v-col class="d-flex justify-end"
                                                   cols="4">
                                                <v-switch v-model="question.isMultipleChoice"
                                                          label="Multiple choice"
                                                          @change="onMultipleChoiceChanged(question)" />
                                            </v-col>
                                        </v-row>

                                        <h5 v-if="question.answers.length"
                                            class="font-weight-bold">
                                            Answers
                                        </h5>

                                        <!-- TODO: Handle this mess of a validation -->
                                        <v-radio-group v-model="question.correctAnswers[0]">
                                            <validation-provider v-for="(answer, j) in question.answers"
                                                                 v-slot="{ errors }"
                                                                 name="Answer"
                                                                 rules="required|max:191"
                                                                 :key="j">
                                                <v-text-field v-model="question.answers[j]"
                                                              dense
                                                              :error-messages="errors">
                                                    <template #prepend>
                                                        <v-checkbox v-if="question.isMultipleChoice"
                                                                    v-model="question.correctAnswers"
                                                                    class="pt-0 mt-0"
                                                                    dense
                                                                    :value="j + 1" />
                                                        <v-radio v-else
                                                                 class="pt-0 mt-0"
                                                                 dense />
                                                    </template>
                                                </v-text-field>
                                            </validation-provider>
                                        </v-radio-group>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>

                            <v-btn absolute
                                   bottom
                                   color="green"
                                   fab
                                   right
                                   @click="onAddQuestionClick">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-form>
    </validation-observer>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { getModule } from 'vuex-module-decorators'

    import * as ArrayUtils from '@/utils/array-utils'

    import { Question } from '@/models/question'
    import { Test } from '@/models/test'

    @Component
    export default class CreateTest extends Vue {
        name = ''
        description = ''
        test: Test = new Test()

        maxAnswers = 8

        get hasQuestions (): boolean {
            return this.test.questions.length > 0
        }

        numberIcon (question: Question): string {
            if (question.answers.length > 9) {
                return 'mdi-numeric-9-plus-box-outline'
            } else {
                return `mdi-numeric-${question.answers.length}-box-outline`
            }
        }

        onAddQuestionClick (): void {
            const question = new Question()
            question.question = `Question ${this.test.questions.length + 1}`
            question.answers = ['', '', '']

            this.test.questions.push(question)
        }

        onMultipleChoiceChanged (question: Question): void {
            question.correctAnswers = []
        }

        onNumberOfAnswersChanged (question: Question, answers: number): void {
            const newCount = Math.min(answers, this.maxAnswers)

            question.answers = ArrayUtils.resize(question.answers, newCount, '')
        }

        onSaveClicked (): void {

        }
    }
</script>