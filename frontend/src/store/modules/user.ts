import { Module, VuexModule, Mutation, Action, config } from 'vuex-module-decorators'

import { UserProfileData } from '@/models/user-profile'

import AccountService from '@/services/acccount-service'
import { UserModuleState } from '@/store/types'

config.rawError = true

@Module({ name: 'user', namespaced: true, stateFactory: true, preserveState: true })
export default class User extends VuexModule implements UserModuleState {
    email = ''
    nickname = ''
    profileData = new UserProfileData()

    @Mutation
    setEmail (payload: string): void {
        this.email = payload
    }

    @Mutation
    setNickname (payload: string): void {
        this.nickname = payload
    }

    @Mutation
    setProfileData (payload: UserProfileData): void {
        this.profileData = payload
    }

    @Action
    async load (): Promise<void> {
        const { email, nickname } = await AccountService.userProfile()

        this.setEmail(email)
        this.setNickname(nickname)
    }

    @Action
    async loadProfile (): Promise<void> {
        this.setProfileData(await AccountService.userTestsData())
    }

    @Action
    async updateProfile (): Promise<void> {
        await AccountService.changeProfile({
            nickname: this.nickname
        })
    }
}
