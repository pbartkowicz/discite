<template>
    <v-app>
        <!-- TODO: Show if app offline -->
        <app-status-bar v-if="false" />

        <app-header />

        <v-main>
            <router-view />
        </v-main>

        <app-footer />
    </v-app>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'

    import AppFooter from '@/components/AppFooter.vue'
    import AppHeader from '@/components/AppHeader.vue'
    import AppStatusBar from '@/components/AppStatusBar.vue'

    @Component({
        components: { AppFooter, AppHeader, AppStatusBar }
    })
    export default class App extends Vue {

    }
</script>