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
                                                     dense
                                                     name="Name"
                                                     rules="required|max:191">
                                    <v-text-field v-model="name"
                                                  dense
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

                            <v-card-text :class="{ 'pa-0': !hasQuestions }">
                               <v-list class="pa-0 transparent">
                                   <template v-for="(question, i) in test.questions">
                                       <v-list-item class="d-block">
                                           <v-row dense
                                                  no-gutters>
                                               <v-col cols="12">
                                                   <v-text-field v-model="test.questions[i].question"
                                                                 dense
                                                                 :label="`Question ${i}`" />
                                               </v-col>
                                           </v-row>

                                           <v-row dense
                                                  no-gutters>
                                               <v-col cols="8">
                                                   <v-text-field dense
                                                                 label="Number of answers"
                                                                 max="8"
                                                                 min="2"
                                                                 type="number"
                                                                 @input="onNumberOfAnswersChanged(question, $event)" />
                                               </v-col>

                                               <v-col class="d-flex justify-end"
                                                      cols="4">
                                                   <v-switch dense
                                                             label="Multiple choice" />
                                               </v-col>
                                           </v-row>

                                           <v-checkbox v-for="(answer, j) in question.answers"
                                                       dense
                                                       :key="j">
                                               <template #label>
                                                   <v-text-field dense
                                                                 hide-details />
                                               </template>
                                           </v-checkbox>
                                       </v-list-item>

                                       <v-divider />
                                   </template>
                               </v-list>

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
            this.test.questions.push(new Question())
        }

        onNumberOfAnswersChanged (question: Question, answers: number): void {
            question.answers = ArrayUtils.resize(question.answers, answers, '')
        }
    }
</script>