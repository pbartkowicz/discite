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
    accessToken = ''
    refreshToken = ''

    @Mutation
    setLogin (payload: string): void {
        this.login = payload
    }

    @Mutation
    setPassword (payload: string): void {
        this.password = payload
    }

    @Mutation
    updateTokens (payload: { access: string, refresh: string }): void {
        this.accessToken = payload.access
        this.refreshToken = payload.refresh

        axios.defaults.headers.common.Authorization = `Bearer ${this.accessToken}`
    }

    @Mutation
    removeToken (): void {
        this.accessToken = ''
        this.refreshToken = ''

        axios.defaults.headers.common.Authorization = ''
    }

    @Action
    async checkToken (): Promise<void> {
        if (this.accessToken) {
            const decodedToken = jwtDecode<JwtPayload>(this.accessToken)
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
                    await this.updateToken()
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
        this.updateTokens(await AuthService.obtainToken(this.login, this.password))

        this.setLogin('')
        this.setPassword('')
    }

    @Action
    async updateToken (): Promise<void> {
        this.updateTokens(await AuthService.refreshToken(this.refreshToken))
    }

    @Action
    async logout (): Promise<void> {
        this.removeToken()
    }

    get isLoggedIn (): boolean {
        return this.accessToken !== ''
    }
}
