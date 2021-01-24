<template>
    <v-container>
        <v-row>
            <test cols="12"
                  lg="8" />

            <v-col cols="12"
                   lg="4">
                <test-stats />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { Prop } from 'vue-property-decorator'
    import { getModule } from 'vuex-module-decorators'

    import Test from '@/views/test/components/Test.vue'
    import TestStats from '@/views/test/components/TestStats.vue'

    import TestModule from '@/store/modules/test'

    @Component({
        components: { Test, TestStats }
    })
    export default class SolveTest extends Vue {
        @Prop({ type: Number, required: false }) id?: number

        testModule = getModule(TestModule, this.$store)

        async created (): Promise<void> {
            if (this.id) {
                await this.testModule.loadTest(this.id)
            }

            if (!this.testModule.isLoaded) {
                await this.$router.push({
                    name: 'home'
                })
                return
            }
        }
    }
</script>