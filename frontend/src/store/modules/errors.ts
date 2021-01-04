import { Module, VuexModule, Action, Mutation, config } from 'vuex-module-decorators'

import { ErrorsModuleState } from '@/store/types'

config.rawError = true

@Module({ name: 'errors', namespaced: true, stateFactory: true, preserveState: true })
export default class Errors extends VuexModule implements ErrorsModuleState {
    readonly timeout = 2000

    error = ''

    @Mutation
    setError (payload: string): void {
        this.error = payload
    }

    @Mutation
    resetError (): void {
        this.error = ''
    }

    @Action
    showError (payload: string): void {
        this.setError(payload)

        setTimeout(() => {
            this.resetError()
        }, this.timeout)
    }

    @Action
    showErrors (payload: Array<string>): void {
        this.showError(payload.join('<br>'))
    }

    get hasError (): boolean {
        return this.error !== ''
    }
}
