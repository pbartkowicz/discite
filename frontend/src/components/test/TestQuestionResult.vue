<template>
    <v-card class="mb-4"
            elevation="4"
            tile>
        <v-card-title class="d-flex justify-space-between">
            {{ question.question }}
            <v-fade-transition>
                <test-question-badge :correct="isCorrect"
                                     :partially-correct="isPartiallyCorrect" />
            </v-fade-transition>
        </v-card-title>
        <v-card-text>
            <template v-if="question.isSingleChoice">
                <v-radio-group v-model="answers[0]"
                               class="mt-0">
                      <v-radio v-for="(answer, idx) in question.answers"
                               disabled
                               :key="idx"
                               :label="answer"
                               :value="idx + 1" />
                </v-radio-group>
            </template>
            <template v-else>
               <v-checkbox v-for="(answer, idx) in question.answers"
                           v-model="answers"
                           class="mt-0"
                           disabled
                           hide-details
                           :key="idx"
                           :label="answer"
                           :value="idx + 1" />
            </template>
        </v-card-text>
        <v-card-actions>
            <slot name="buttons" />
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { Prop, Watch } from 'vue-property-decorator'

    import { Question } from '@/models/question'

    import TestQuestionBadge from '@/components/test/TestQuestionBadge.vue'

    @Component({
        components: { TestQuestionBadge }
    })
    export default class TestQuestionResult extends Vue {
        @Prop({ type: Array, required: true }) answers!: Array<number>
        @Prop({ type: Object, required: true }) question!: Question

        get isCorrect (): boolean {
            return this.answers.every(x => this.question.correctAnswers.includes(x))
        }

        get isPartiallyCorrect (): boolean {
            return this.answers.some(x => this.question.correctAnswers.includes(x))
        }
    }
</script>