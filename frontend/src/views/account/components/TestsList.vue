<template>
    <v-list v-if="tests.length > 0">
        <template v-for="(test, i) in tests">
            <v-list-item :key="i">
                <v-list-item-content>
                    <v-list-item-title>{{ test.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ test.description }}</v-list-item-subtitle>

                    <v-list-item-subtitle v-if="withResults"
                                          class="mt-2">
                        <v-chip color="green darken-2 mr-2">Correct: {{ test.correct }}</v-chip>
                        <v-chip color="yellow darken-2 mr-2">Partially correct: {{ test.partially_correct }}</v-chip>
                        <v-chip color="red darken-2">Wrong: {{ test.wrong }}</v-chip>
                    </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                    <slot v-bind:test="test"
                          name="action" />
                </v-list-item-action>
            </v-list-item>

            <v-divider v-if="i < tests.length - 1"
                       :key="i" />
        </template>
    </v-list>
    <v-list v-else>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title>Sorry, no entries :(</v-list-item-title>
                <v-list-item-subtitle>Go solve something!</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { Prop } from 'vue-property-decorator'

    import { Test } from '@/models/test'

    @Component
    export default class TestsList extends Vue {
        @Prop({ type: Array, required: true }) tests!: Array<Test>
        @Prop({ type: Boolean, default: false }) withResults!: boolean
    }
</script>