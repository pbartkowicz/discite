<template>
    <v-data-table :headers="headers"
                  :items="tests">
        <template #item.actions="{ item }">
            <span class="text-no-wrap">
                <v-btn icon
                       @click="onEditEntry(item.id)">
                    <v-icon color="green"
                            small>
                        mdi-pencil
                    </v-icon>
                </v-btn>

                <v-btn icon
                       @click="onDeleteEntry(item.id)">
                    <v-icon color="red"
                            small>
                        mdi-delete
                    </v-icon>
                </v-btn>
            </span>
        </template>
    </v-data-table>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { Prop } from 'vue-property-decorator'
    import { DataTableHeader } from 'vuetify'

    import { Test } from '@/models/test'

    @Component
    export default class Account extends Vue {
        @Prop({ type: Array, required: true }) tests!: Array<Test>

        get headers (): Array<DataTableHeader> {
            return [
                { text: 'Test', value: 'name' },
                { text: 'Description', value: 'description' },
                { text: 'Number of questions', value: 'questions.length' },
                { text: 'Created at', value: 'created_at' },
                { text: 'Actions', value: 'actions', sortable: false, align: 'end' }
            ]
        }

        onEditEntry (id: number): void {
            this.$emit('edit', id)
        }

        onDeleteEntry (id: number): void {
            this.$emit('delete', id)
        }
    }
</script>