import axios from 'axios'

import Api from '@/services/api'

interface UserInfo {
    // TODO
}

interface ChangePasswordRequest {
    // TODO
}

interface ChangeProfileRequest {
    // TODO
}

interface UserProfile {
    email: string
    nickname: string
}

class AccountService {
    async changePassword (request: ChangePasswordRequest): Promise<void> {
        await axios.patch(Api.user.changePassword, request)
    }

    async changeProfile (request: ChangeProfileRequest): Promise<void> {
        await axios.patch(Api.user.profile.update, request)
    }

    async userInfo (): Promise<UserInfo> {
        const response = await axios.get<UserInfo>(Api.user.userInfo)

        return response.data
    }

    async userProfile (): Promise<UserProfile> {
        const response = await axios.get<UserProfile>(Api.user.profile.read)

        return response.data
    }
}

export default new AccountService()
