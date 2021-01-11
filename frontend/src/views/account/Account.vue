<template>
    <v-container>
        <v-row>
            <v-col cols="12"
                   lg="4">
                <account-info />
            </v-col>

            <v-col cols="12"
                   lg="8">
                <v-tabs v-model="selectedTab"
                        fixed-tabs>
                    <v-tab>
                        <v-icon left>mdi-folder-account</v-icon>
                        My tests
                    </v-tab>

                    <v-tab>
                        <v-icon left>mdi-test-tube</v-icon>
                        Solved tests
                    </v-tab>

                    <v-tab>
                        <v-icon left>mdi-test-tube-empty</v-icon>
                        Unfinished tests
                    </v-tab>

                    <v-tab>
                        <v-icon left>mdi-trophy</v-icon>
                        Achievements
                    </v-tab>
                </v-tabs>

                <v-tabs-items v-model="selectedTab">
                    <!-- My tests -->
                    <v-tab-item>
                        <my-tests :tests="tests"
                                  @delete="onDeleteTest"
                                  @edit="onEditTest" />
                    </v-tab-item>

                    <!-- Solved tests -->
                    <v-tab-item>
                        <tests-list with-results
                                    :tests="tests">
                            <template #action>
                                <v-tooltip left>
                                    <template #activator="{ attrs, on }">
                                        <v-btn v-bind="attrs"
                                               v-on="on"
                                               icon
                                               :to="{ name: 'test.results' }">
                                            <v-icon color="primary">
                                                mdi-information
                                            </v-icon>
                                        </v-btn>
                                    </template>

                                    See the results
                                </v-tooltip>
                            </template>
                        </tests-list>
                    </v-tab-item>

                    <!-- Unfinished tests -->
                    <v-tab-item>
                        <tests-list :tests="tests">
                            <template #action>
                                <v-tooltip left>
                                    <template #activator="{ attrs, on }">
                                        <v-btn v-bind="attrs"
                                               v-on="on"
                                               icon
                                               :to="{ name: 'test.solve' }">
                                            <v-icon color="green">
                                                mdi-play
                                            </v-icon>
                                        </v-btn>
                                    </template>

                                    Solve the test
                                </v-tooltip>
                            </template>
                        </tests-list>
                    </v-tab-item>

                    <!-- Achievements -->
                    <v-tab-item>
                        <achievement-list :achievements="achievements" />
                    </v-tab-item>
                </v-tabs-items>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'

    import { Achievement } from '@/models/achievement'
    import { Test } from '@/models/test'
    import { Question } from '@/models/question'

    import AccountInfo from '@/views/account/components/AccountInfo.vue'
    import AchievementList from '@/views/account/components/AchievementList.vue'
    import MyTests from '@/views/account/components/MyTests.vue'
    import TestsList from '@/views/account/components/TestsList.vue'

    @Component({
        components: { AccountInfo, AchievementList, MyTests, TestsList }
    })
    export default class Account extends Vue {
        selectedTab = 0

        get achievements (): Array<Achievement> {
            const a1 = new Achievement()
            a1.name = 'Solve 1 test'
            a1.acquired_at = '2020-01-01'

            const a2 = new Achievement()
            a2.name = 'Solve 5 tests'

            const a3 = new Achievement()
            a3.name = 'Solve 15 tests'

            const a4 = new Achievement()
            a4.name = 'Create 1 test'
            a4.acquired_at = '2020-01-01'

            return [ a1, a2, a3, a4 ]
        }

        get tests (): Array<Test> {
            const test1 = new Test()
            test1.id = 1
            test1.name = 'Test 1'
            test1.description = 'Very long test description'
            test1.questions = [
                new Question(),
                new Question(),
                new Question()
            ]

            const test2 = new Test()
            test1.id = 2
            test2.name = 'Test 2'
            test2.description = 'Another test description that is even longer than the first one to make sure that UI does not crash'
            test2.questions = [
                new Question(),
                new Question(),
                new Question()
            ]

            const test3 = new Test()
            test3.id = 3
            test3.name = 'Test 3'
            test3.questions = [
                new Question(),
                new Question(),
                new Question()
            ]

            return [ test1, test2, test3 ]
        }

        onDeleteTest (id: number): void {

        }

        onEditTest (id: number): void {

        }
    }
</script>