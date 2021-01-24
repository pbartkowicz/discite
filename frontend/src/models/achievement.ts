interface AchievementInterface {
    id: number
    achievement: string
    acquired_at: string
}

class Achievement {
    id = 0
    name = ''
    icon = 'mdi-trophy'
    acquired_at = ''

    public static fromInterface(achievementInterface: AchievementInterface): Achievement {
        const achievement = new Achievement()

        achievement.id = achievementInterface.id
        achievement.name = achievementInterface.achievement
        achievement.acquired_at = achievementInterface.acquired_at

        return achievement
    }
}

export {
    AchievementInterface,
    Achievement
}
