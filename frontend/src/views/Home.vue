<template>
    <v-container>
        <v-row>
            <v-col>
                <h2 class="text-center text-h4">
                    Load questions from file or
                    <router-link :to="{ name: 'test.create' }">create new</router-link> test.
                </h2>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-alert type="info"
                         outlined>
                    Currently supported test formats:
                    <ul>
                        <li>Simple CSV (question,answer1,answer2,answer3,answer4,correct,tips)</li>
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
                        <li v-for="error in errors"
                            v-html="error" />
                    </ul>
                </v-card-text>
            </v-card>
        </template>
    </v-container>
</template>

<script lang="ts">
    import { isEqual } from 'lodash'
    import { parse, ParseResult } from 'papaparse'
    import Vue from 'vue'
    import { ValidationProvider } from 'vee-validate'
    import Component from 'vue-class-component'
    import { getModule } from 'vuex-module-decorators'

    import { CsvQuestion } from '@/models/file-loaded/csv'
    import { Test } from '@/models/test'

    import TestModule from '@/store/modules/test'

    @Component
    export default class Home extends Vue {
        testModule = getModule(TestModule, this.$store)

        errors: Array<string> = []

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
                'question', 'answer1', 'answer2', 'answer3', 'answer4', 'correct', 'tips'
            ]

            parse<CsvQuestion>(file, {
                complete: (results: ParseResult<CsvQuestion>) => {
                    if (!isEqual(results.meta.fields, expectedHeaders)) {
                        this.errors = [
                            'Your file is missing headers or headers are invalid.',
                            `<strong>Expected headers:</strong> ${expectedHeaders.join(',')}`,
                            `<strong>Actual headers:</strong> ${results.meta.fields?.join(',')}`
                        ]
                    } else {
                        if (results.errors.length > 0) {
                            this.errors = results.errors.map(err => {
                                return `<strong>Row ${err.row}</strong> - ${err.message}`
                            })
                        } else {
                            this.testModule.setTest(Test.fromCsvQuestions(results.data))
                            this.$router.push({
                                name: 'test.solve'
                            })
                        }
                    }
                },
                delimiter: ',',
                dynamicTyping: true,
                header: true,
                skipEmptyLines: true,
                transform (value: string, field: string | number): unknown {
                    if (field === 'correct') {
                        return new Set(value.split(',')
                            .map(x => parseInt(x, 10)))
                    }

                    return value
                }
            })
        }
    }
</script>
