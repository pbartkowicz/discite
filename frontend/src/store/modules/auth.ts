import jwtDecode, { JwtPayload } from 'jwt-decode'
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'

import AuthService from '@/services/auth-service'
import Store from '@/store/index'

@Module({ dynamic: true, name: 'auth', namespaced: true, stateFactory: true, preserveState: true, store: Store })
class Auth extends VuexModule {
    token: string = ''

    @Mutation
    updateToken (payload: string): void {
        this.token = payload
    }

    @Mutation
    removeToken (): void {
        this.token = ''
    }

    @Action
    async checkToken (): Promise<void> {
        if (this.token) {
            const decodedToken = jwtDecode<JwtPayload>(this.token)
            const { exp, iat } = decodedToken

            if (exp !== undefined && iat !== undefined) {
                // 1800 == 30 minutes, 628200 == 7 days
                const now = Date.now() / 1000
                const expiresIn30Minutes = exp - now < 1800
                const reachingLifespan = now - iat < 628200

                if (expiresIn30Minutes && reachingLifespan) {
                    await this.refreshToken()
                } else if (expiresIn30Minutes) {
                    // Basically do nothing. Do not refresh
                } else {
                    // TODO: Prompt user to login once again. Token expired
                }
            }
        }
    }

    @Action
    async obtainToken (payload: { login: string, password: string }): Promise<void> {
        this.updateToken(await AuthService.obtainToken(payload.login, payload.password))
    }

    @Action
    async refreshToken (): Promise<void> {
        this.updateToken(await AuthService.refreshToken(this.token))
    }
}

export default getModule(Auth, Store)
