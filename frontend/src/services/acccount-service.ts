import axios from 'axios'

import Api from '@/services/api'

interface ChangePasswordRequest {
    // TODO
}

interface ChangeProfileRequest {
    // TODO
}

interface UserProfile {
    // TODO
}

class AccountService {
    async changePassword (request: ChangePasswordRequest): Promise<void> {
        await axios.patch(Api.user.password, request)
    }

    async changeProfile (request: ChangeProfileRequest): Promise<void> {
        await axios.patch(Api.user.changeProfile, request)
    }

    async userProfile (): Promise<UserProfile> {
        const response = await axios.get<UserProfile>(Api.user.profile)

        return response.data
    }
}

export default new AccountService()
