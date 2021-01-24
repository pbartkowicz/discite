import { Module, VuexModule, Mutation, Action, config } from 'vuex-module-decorators'

import AccountService from '@/services/acccount-service'
import { UserModuleState } from '@/store/types'

config.rawError = true

@Module({ name: 'user', namespaced: true, stateFactory: true, preserveState: true })
export default class User extends VuexModule implements UserModuleState {
    email = ''
    nickname = ''

    @Mutation
    setEmail (payload: string): void {
        this.email = payload
    }

    @Mutation
    setNickname (payload: string): void {
        this.nickname = payload
    }

    @Action
    async load (): Promise<void> {
        const data = await AccountService.userProfile()

        this.setEmail(data.email)
        this.setNickname(data.nickname)
    }
}
