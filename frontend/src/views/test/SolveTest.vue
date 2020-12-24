<template>
    <v-container>
        <test />
    </v-container>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'

    import Test from '@/components/test/Test.vue'

    @Component({
        components: { Test }
    })
    export default class Home extends Vue {

    }
</script>