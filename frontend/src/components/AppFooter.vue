<template>
    <v-footer padless>
        <v-row justify="center"
               no-gutters>
            <v-col class="primary py-4 text-center white--text"
                   cols="12">
                {{ new Date().getFullYear() }} — <strong>Discite</strong>
            </v-col>
        </v-row>
    </v-footer>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'

    @Component
    export default class AppFooter extends Vue {

    }
</script>