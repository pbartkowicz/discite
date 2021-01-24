<template>
    <v-list>
        <template v-for="(achievement, i) in achievements">
            <v-list-item :key="`achievement-${achievement.id}`">
                <v-list-item-avatar>
                    <v-icon :class="achievement.acquired_at ? 'green--text' : 'text--secondary'">
                        {{ achievement.icon }}
                    </v-icon>
                </v-list-item-avatar>

                <v-list-item-title :class="{ 'text--secondary': !achievement.acquired_at }">
                    {{ achievement.name }}
                </v-list-item-title>

                <v-list-item-subtitle v-if="achievement.acquired_at">
                    Acquired: {{ achievement.acquired_at }}
                </v-list-item-subtitle>
            </v-list-item>

            <v-divider v-if="i < achievements.length - 1"
                       :key="`divider-${achievement.id}`" />
        </template>
    </v-list>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { Prop } from 'vue-property-decorator'

    import { Achievement } from '@/models/achievement'

    @Component
    export default class AchievementList extends Vue {
        @Prop({ type: Array, required: true }) achievements!: Array<Achievement>
    }
</script>