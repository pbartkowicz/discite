<template>
    <v-card>
        <v-card-title>Tips</v-card-title>

        <v-card-text>
            {{ question.tips }}
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { Prop } from 'vue-property-decorator'

    import { Question } from '@/models/question'

    @Component
    export default class TestQuestionBadge extends Vue {
        @Prop({ type: Object, required: true }) question!: Question
    }
</script>