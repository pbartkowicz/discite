<template>
    <v-card class="mb-4"
            elevation="4"
            tile>
        <v-card-title class="d-flex justify-space-between">
            {{ question.question }}
            <v-fade-transition>
                <test-question-badge v-if="checked"
                                     :correct="isCorrect"
                                     :partially-correct="isPartiallyCorrect" />
            </v-fade-transition>
        </v-card-title>
        <v-card-text>
            <template v-if="!question.isMultipleChoice">
                <v-radio-group v-model="innerAnswers[0]"
                               class="mt-0">
                      <v-radio v-for="answer in question.answers"
                               :disabled="checked"
                               :key="answer.id"
                               :label="answer.value"
                               :value="answer.id" />
                </v-radio-group>
            </template>
            <template v-else>
               <v-checkbox v-for="answer in question.answers"
                           v-model="innerAnswers"
                           class="mt-0"
                           hide-details
                           :disabled="checked"
                           :key="answer.id"
                           :label="answer.value"
                           :value="answer.id" />
            </template>
        </v-card-text>
        <v-card-actions>
            <v-col v-if="!checked || (question.hasTips && !revealed)"
                   :cols="buttonsColumnCount">
                <v-btn v-if="checked && !revealed && question.hasTips"
                       block
                       color="orange"
                       class="darken-2 white--text"
                       @click="onReveal">
                    Reveal tips
                </v-btn>
                <v-btn v-else-if="!checked"
                       block
                       color="amber"
                       :disabled="!innerAnswers.length"
                       @click="onCheck">
                    Check
                </v-btn>
            </v-col>
            <v-col v-if="!!$slots['buttons']"
                   :cols="buttonsSlotColumnCount">
                <slot name="buttons" />
            </v-col>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { Prop, Watch } from 'vue-property-decorator'

    import { Answer } from '@/models/answer'
    import { Question } from '@/models/question'

    import TestQuestionBadge from '@/views/test/components/TestQuestionBadge.vue'

    @Component({
        components: { TestQuestionBadge }
    })
    export default class TestQuestion extends Vue {
        @Prop({ type: Array, required: true }) answers!: Array<Answer>
        @Prop({ type: Boolean, required: true }) checked!: boolean
        @Prop({ type: Object, required: true }) question!: Question
        @Prop({ type: Boolean, required: true }) revealed!: boolean

        innerAnswers: Array<number> = []

        get isCorrect (): boolean {
            return this.innerAnswers.every(x => this.question.correctAnswers.includes(x))
        }

        get isPartiallyCorrect (): boolean {
            return this.innerAnswers.some(x => this.question.correctAnswers.includes(x))
        }

        get buttonsColumnCount (): number {
            return this.checked ? 6 : 12
        }

        get buttonsSlotColumnCount (): number {
            return (!this.question.hasTips || this.revealed) ? 12 : 6
        }

        @Watch('answers')
        onAnswersChanged (after: Array<number>) {
            this.innerAnswers = after
        }

        onCheck (): void {
            this.$emit('update:checked', true)
            this.$emit('check',  this.innerAnswers, this.isCorrect, this.isPartiallyCorrect)
        }

        onReveal (): void {
            this.$emit('update:revealed', true)
        }
    }
</script>