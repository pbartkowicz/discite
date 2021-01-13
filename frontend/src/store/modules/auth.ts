import axios from 'axios'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import { Module, VuexModule, Mutation, Action, config } from 'vuex-module-decorators'

import AuthService from '@/services/auth-service'
import { AuthModuleState } from '@/store/types'

config.rawError = true

@Module({ name: 'auth', namespaced: true, stateFactory: true, preserveState: true })
export default class Auth extends VuexModule implements AuthModuleState {
    login = ''
    password = ''
    token = ''

    @Mutation
    setLogin (payload: string): void {
        this.login = payload
    }

    @Mutation
    setPassword (payload: string): void {
        this.password = payload
    }

    @Mutation
    updateToken (payload: string): void {
        this.token = payload

        axios.defaults.headers.common.Authorization = `JWT ${this.token}`
    }

    @Mutation
    removeToken (): void {
        this.token = ''

        axios.defaults.headers.common.Authorization = ''
    }

    @Action
    async checkToken (): Promise<void> {
        if (this.token) {
            const decodedToken = jwtDecode<JwtPayload>(this.token)
            const { exp, iat } = decodedToken

            if (exp !== undefined) {
                // 1800 == 30 minutes, 628200 == 7 days
                const now = Date.now() / 1000
                const expiresIn30Minutes = exp - now < 1800

                // If iat is undefined assume that token is not reaching its lifespan
                const reachingLifespan = iat !== undefined
                    ? now - iat < 628200
                    : false

                if (expiresIn30Minutes && reachingLifespan) {
                    await this.refreshToken()
                } else if (expiresIn30Minutes) {
                    // Basically do nothing. Do not refresh. Token is good.
                } else {
                    this.removeToken()
                }
            }
        }
    }

    @Action
    async obtainToken (): Promise<void> {
        this.updateToken(await AuthService.obtainToken(this.login, this.password))

        this.setLogin('')
        this.setPassword('')
    }

    @Action
    async refreshToken (): Promise<void> {
        this.updateToken(await AuthService.refreshToken(this.token))
    }

    @Action
    async logout (): Promise<void> {
        this.removeToken()
    }

    get isLoggedIn (): boolean {
        return this.token !== ''
    }
}
