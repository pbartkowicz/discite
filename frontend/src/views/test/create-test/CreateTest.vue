<template>
    <v-container>
        <h4 class="text-center">Create a new test</h4>

        <test-form />
    </v-container>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'

    import TestForm from '@/views/test/create-test/components/TestForm.vue'

    @Component({
        components: { TestForm }
    })
    export default class CreateTest extends Vue {

    }
</script>