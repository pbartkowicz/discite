<template>
    <v-card class="mb-4">
        <v-card-title class="d-flex justify-space-between">
            {{ question.question }}
            <v-chip v-if="answers.length"
                    :class="isCorrect ? 'green' : 'red'">
                {{ isCorrect ? 'Correct' : 'Wrong' }}
            </v-chip>
        </v-card-title>
        <v-card-text>
            <template v-if="isSingleChoice">
                <v-radio-group v-model="answers[0]"
                               class="mt-0">
                      <v-radio v-for="(answer, idx) in question.answers"
                               :key="idx"
                               :label="answer"
                               :value="idx + 1" />
                </v-radio-group>
            </template>
            <template v-else>
               <v-checkbox v-for="(answer, idx) in question.answers"
                           v-model="answers"
                           class="mt-0"
                           hide-details
                           :key="idx"
                           :label="answer"
                           :value="idx + 1" />
            </template>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
    import { isEqual } from 'lodash'
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { Prop } from 'vue-property-decorator'

    import { Question } from '@/models/question'

    @Component
    export default class TestQuestion extends Vue {
        @Prop({ type: Object, required: true }) question!: Question

        answers: Array<number> = []

        get isCorrect (): boolean {
            return isEqual(this.question.correctAnswers, this.answers)
        }

        get isSingleChoice (): boolean {
            return this.question.correctAnswers.length === 1
        }
    }
</script>