import axios from 'axios'

import Api from '@/services/api'

type ChangePasswordRequest = {
    // TODO
}

interface UserProfile {
    // TODO
}

class AccountService {
    async changePassword (request: ChangePasswordRequest): Promise<void> {
        await axios.patch(Api.user.password, request)
    }

    async userProfile (): Promise<UserProfile> {
        const response = await axios.get<UserProfile>(Api.user.profile)

        return response.data
    }
}

export default new AccountService()
