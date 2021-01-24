import { AxiosError } from 'axios'
import Vue from 'vue'
import { getModule } from 'vuex-module-decorators'

import ErrorsModule from '@/store/modules/errors'

Vue.config.errorHandler = async function (err, vm) {
    if (process.env.NODE_ENV !== 'production') {
        console.debug(err)
    }

    const errorsModule = getModule(ErrorsModule, vm.$store)

    if ((err as AxiosError).isAxiosError) {
        const error = err as AxiosError

        if (error.response) {
            switch (error.response.status) {
                case 400:
                    if (error.response.data.non_field_errors) {
                        errorsModule.showErrors(error.response.data.non_field_errors)
                    } else {
                        errorsModule.showError('Form data contains errors')
                    }
                    break

                case 401:
                    await vm.$router.replace({ name: 'auth'})
                    break

                case 403:
                    errorsModule.showError(`You don't have permissions to perform this action`)
                    break

                case 404:
                    await vm.$router.replace({ name: '404' }) // TODO: Create that route
                    break

                case 503:
                    errorsModule.showError('Service temporarily unavailable')
                    break

                default:
                    errorsModule.showError('Undefined error occurred')
            }
        } else {
            errorsModule.showError('Undefined error occurred')
        }
    } else {
        errorsModule.showError('Undefined error occurred')
    }
}