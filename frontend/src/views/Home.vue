<template>
    <v-container>
        <template v-if="showTest">
            <test-question v-for="(question, idx) in test.questions"
                           :key="idx"
                           :question="question" />
        </template>
        <template v-else>
            <v-row>
                <v-col>
                    <h2 class="text-center text-h4">
                        Load questions from file or
                        <router-link :to="{ name: 'test-create' }">create new</router-link> test.
                    </h2>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-alert type="info"
                             outlined>
                        Currently supported test formats:
                        <ul>
                            <li>Simple CSV (question,answer1,answer2,answer3,answer4,correct)</li>
                        </ul>
                    </v-alert>
                </v-col>
            </v-row>

            <validation-provider v-slot="{ errors }"
                                 name="File"
                                 ref="provider"
                                 rules="required">
                <v-file-input label="Test file"
                              outlined
                              placeholder="File with your test content"
                              show-size
                              :error-messages="errors"
                              @change="onFileSelected" />
            </validation-provider>

            <template v-if="errors.length">
                <v-card>
                    <v-alert class="mb-0"
                             type="error">
                        There were some errors with your file.
                    </v-alert>
                    <v-card-text>
                        <ul>
                            <li v-for="error in errors">{{ error }}</li>
                        </ul>
                    </v-card-text>
                </v-card>
            </template>
        </template>
    </v-container>
</template>

<script lang="ts">
    import { isEqual } from 'lodash'
    import { parse, ParseResult } from 'papaparse'
    import Vue from 'vue'
    import { ValidationProvider } from 'vee-validate'
    import Component from 'vue-class-component'

    import { CsvQuestion } from '@/models/file-loaded/csv'
    import { Test } from '@/models/test'

    import TestQuestion from '@/components/test/TestQuestion.vue'

    @Component({
        components: { TestQuestion }
    })
    export default class Home extends Vue {
        errors: Array<string> = []
        showTest = false
        test: Test = new Test()

        $refs!: {
            provider: InstanceType<typeof ValidationProvider>
        }

        async onFileSelected (file: File): Promise<void> {
            const { valid } = await this.$refs.provider.validate(file)

            if (valid) {
                this.parseFile(file)
            }
        }

        parseFile (file: File): void {
            const expectedHeaders: Array<keyof CsvQuestion> = [
                'question', 'answer1', 'answer2', 'answer3', 'answer4', 'correct'
            ]

            parse<CsvQuestion>(file, {
                complete: (results: ParseResult<CsvQuestion>) => {
                    if (!isEqual(results.meta.fields, expectedHeaders)) {
                        this.errors = [
                            'Your file is missing headers or headers are invalid.'
                        ]
                    } else {
                        if (results.errors.length > 0) {
                            this.errors = results.errors.map(err => {
                                return err.message
                            })
                        } else {
                            this.test = Test.fromCsvQuestions(results.data)
                            this.showTest = true
                        }
                    }
                },
                delimiter: ',',
                dynamicTyping: true,
                header: true,
                skipEmptyLines: true
            })
        }
    }
</script>
