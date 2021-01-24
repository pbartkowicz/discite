import axios from 'axios'

import Api from '@/services/api'

class AuthService {
    async obtainToken (login: string, password: string): Promise<{ access: string, refresh: string }> {
        const response = await axios.post<{ access: string, refresh: string }>(Api.auth.token.get, {
            username: login,
            password: password
        })

        return response.data
    }

    async refreshToken (token: string): Promise<{ access: string, refresh: string }> {
        const response = await axios.post<{ access: string, refresh: string }>(Api.auth.token.refresh, {
            token: token
        })

        return response.data
    }

    async signUp (request: { login: string, email: string, password: string }): Promise<void> {
        await axios.post(Api.auth.signUp, request)
    }
}

export default new AuthService()
