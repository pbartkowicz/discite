import { NavigationGuardNext, Route } from 'vue-router'
import { getModule } from 'vuex-module-decorators'

import AuthModule from '@/store/modules/auth'
import { UserState } from '@/router/user-state'
import Store from '@/store'

const redirectIfNotAuthenticated = (to: Route, from: Route, next: NavigationGuardNext) => {
    const currentState = getModule(AuthModule, Store).isLoggedIn ? UserState.LoggedIn : UserState.Guest

    if (to.meta.state !== undefined) {
        if (to.meta.state === currentState) {
            next()
        } else {
            if (currentState === UserState.LoggedIn) {
                next({ name: 'home' })
            } else {
                next({ name: 'auth' })
            }
        }
    }

    next()
}

export {
    redirectIfNotAuthenticated
}