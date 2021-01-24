import { Module, VuexModule, Mutation, Action, config } from 'vuex-module-decorators'

import AuthService from '@/services/auth-service'
import { SignUpModuleState } from '@/store/types'

config.rawError = true

@Module({ name: 'signup', namespaced: true, stateFactory: true, preserveState: true })
export default class Signup extends VuexModule implements SignUpModuleState {
    login = ''
    email = ''
    password = ''

    @Mutation
    setLogin (payload: string): void {
        this.login = payload
    }

    @Mutation
    setEmail (payload: string): void {
        this.email = payload
    }

    @Mutation
    setPassword (payload: string): void {
        this.password = payload
    }

    @Mutation
    clear (): void {
        this.login = ''
        this.email = ''
        this.password = ''
    }

    @Action
    async signUp (): Promise<void> {
        await AuthService.signUp({
            login: this.login,
            email: this.email,
            password: this.password
        })
    }
}
