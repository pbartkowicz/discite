<template>
    <v-chip :class="badgeClass">
        {{ badgeText }}
    </v-chip>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { Prop } from 'vue-property-decorator'

    @Component
    export default class TestQuestionBadge extends Vue {
        @Prop({ type: Boolean, required: true }) correct!: boolean
        @Prop({ type: Boolean, required: true }) partiallyCorrect!: boolean

        get badgeClass (): string {
            if (this.correct) {
                return 'green'
            }

            if (this.partiallyCorrect) {
                return 'yellow'
            }

            return 'red'
        }

        get badgeText (): string {
            if (this.correct) {
                return 'Correct'
            }

            if (this.partiallyCorrect) {
                return 'Partially correct'
            }

            return 'Wrong'
        }
    }
</script>