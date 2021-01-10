<template>
    <v-container>
        <h4 class="text-center">Create a new test</h4>

        <validation-observer>
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
                                                    class="mb-8">
                                    <v-expansion-panel v-for="(question, i) in test.questions"
                                                       :key="i">
                                        <v-expansion-panel-header>
                                            {{ test.questions[i].question }}
                                        </v-expansion-panel-header>

                                        <v-expansion-panel-content>
                                            <v-row dense
                                                   no-gutters>
                                                <v-col cols="12">
                                                    <v-text-field v-model="test.questions[i].question"
                                                                  label="Question" />
                                                </v-col>
                                            </v-row>

                                            <v-row dense
                                                   no-gutters>
                                                <v-col cols="8">
                                                    <v-text-field label="Number of answers"
                                                                  max="8"
                                                                  min="2"
                                                                  type="number"
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

                                            <v-radio-group v-model="question.correctAnswers[0]">
                                                <v-text-field v-for="(answer, j) in question.answers"
                                                              v-model="question.answers[j]"
                                                              dense
                                                              :key="j">
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
    </v-container>
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

        get hasQuestions (): boolean {
            return this.test.questions.length > 0
        }

        onAddQuestionClick (): void {
            const question = new Question()
            question.question = `Question ${this.test.questions.length + 1}`

            this.test.questions.push(question)
        }

        onMultipleChoiceChanged (question: Question): void {
            question.correctAnswers = []
        }

        onNumberOfAnswersChanged (question: Question, answers: number): void {
            question.answers = ArrayUtils.resize(question.answers, answers, '')
        }
    }
</script>