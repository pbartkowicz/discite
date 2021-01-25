import { Achievement, AchievementInterface } from '@/models/achievement'
import { Test, TestInterface } from '@/models/test'

interface UserProfileDataInterface {
    achievements: Array<AchievementInterface>
    my_tests: Array<TestInterface>
    solved_tests: Array<TestInterface>
    unfinished_tests: Array<TestInterface>
}

class UserProfileData {
    achievements: Array<Achievement> = []
    myTests: Array<Test> = []
    solvedTests: Array<Test> = []
    unfinishedTests: Array<Test> = []

    public static fromInterface(data: UserProfileDataInterface): UserProfileData {
        const ret = new UserProfileData()

        ret.achievements = data.achievements.map(o => Achievement.fromInterface(o))
        ret.myTests = data.my_tests.map(t => Test.fromInterface(t))
        ret.solvedTests = data.solved_tests.map(t => Test.fromInterface(t))
        ret.unfinishedTests = data.unfinished_tests.map(t => Test.fromInterface(t))

        return ret
    }
}

export {
    UserProfileDataInterface,
    UserProfileData
}
