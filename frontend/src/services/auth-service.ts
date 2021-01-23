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
}

export default new AuthService()
