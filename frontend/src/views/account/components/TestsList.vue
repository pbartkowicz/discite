<template>
    <v-list>
        <template v-for="(test, i) in tests">
            <v-list-item :key="i">
                <v-list-item-content>
                    <v-list-item-title>{{ test.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ test.description }}</v-list-item-subtitle>

                    <v-list-item-subtitle v-if="withResults"
                                          class="mt-2">
                        Result: {{ test.result }}
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
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { Prop } from 'vue-property-decorator'

    import { Test } from '@/models/test'

    @Component
    export default class Account extends Vue {
        @Prop({ type: Array, required: true }) tests!: Array<Test>
        @Prop({ type: Boolean, default: false }) withResults!: boolean
    }
</script>