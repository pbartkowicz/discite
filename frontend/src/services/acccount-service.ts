import axios from 'axios'

import Api from '@/services/api'

interface UserTestsData {
    // TODO
}

interface ChangePasswordRequest {
    new: string
    old: string
    confirmation: string
}

interface ChangeProfileRequest {
    nickname: string
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

    async userTestsData (): Promise<UserTestsData> {
        const response = await axios.get<UserTestsData>(Api.user.userTestsData)

        return response.data
    }

    async userProfile (): Promise<UserProfile> {
        const response = await axios.get<UserProfile>(Api.user.profile.read)

        return response.data
    }
}

export default new AccountService()
