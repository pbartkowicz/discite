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
                        <my-tests :tests="accountModule.profileData.myTests"
                                  @delete="onDeleteTest"
                                  @edit="onEditTest"
                                  @toggle-public="onTogglePublic" />
                    </v-tab-item>

                    <!-- Solved tests -->
                    <v-tab-item>
                        <tests-list with-results
                                    :tests="accountModule.profileData.solvedTests">
                            <template #action>
<!--                                <v-tooltip left>-->
<!--                                    <template #activator="{ attrs, on }">-->
<!--                                        <v-btn v-bind="attrs"-->
<!--                                               v-on="on"-->
<!--                                               icon-->
<!--                                               :to="{ name: 'test.results' }">-->
<!--                                            <v-icon color="primary">-->
<!--                                                mdi-information-->
<!--                                            </v-icon>-->
<!--                                        </v-btn>-->
<!--                                    </template>-->

<!--                                    See the results-->
<!--                                </v-tooltip>-->
                            </template>
                        </tests-list>
                    </v-tab-item>

                    <!-- Unfinished tests -->
                    <v-tab-item>
                        <tests-list :tests="accountModule.profileData.unfinishedTests">
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
                        <achievement-list :achievements="accountModule.profileData.achievements" />
                    </v-tab-item>
                </v-tabs-items>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { getModule } from 'vuex-module-decorators'

    import AccountModule from '@/store/modules/user'
    import TestModule from '@/store/modules/test'

    import AccountInfo from '@/views/account/components/AccountInfo.vue'
    import AchievementList from '@/views/account/components/AchievementList.vue'
    import MyTests from '@/views/account/components/MyTests.vue'
    import TestsList from '@/views/account/components/TestsList.vue'

    @Component({
        components: { AccountInfo, AchievementList, MyTests, TestsList }
    })
    export default class Account extends Vue {
        accountModule = getModule(AccountModule, this.$store)
        testModule = getModule(TestModule, this.$store)
        selectedTab = 0

        onDeleteTest (id: number): void {
            // TODO
        }

        onEditTest (id: number): void {
            // TODO
        }

        async onTogglePublic (payload: { id: number, newPublic: boolean }): Promise<void> {
            await this.testModule.changePublic(payload)
            await this.accountModule.loadProfile()
        }

        async mounted (): Promise<void> {
            await this.accountModule.loadProfile()
        }
    }
</script>