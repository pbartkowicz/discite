import axios from 'axios'

import Api from '@/services/api'

class AuthService {
    async obtainToken (login: string, password: string): Promise<string> {
        const response = await axios.post<{ token: string }>(Api.auth.jwt.obtain, {
            username: login,
            password: password
        })

        return response.data.token
    }

    async refreshToken (token: string): Promise<string> {
        const response = await axios.post<{ token: string }>(Api.auth.jwt.refresh, {
            token: token
        })

        return response.data.token
    }
}

export default new AuthService()
