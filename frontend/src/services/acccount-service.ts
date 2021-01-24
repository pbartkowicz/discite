import axios from 'axios'

import { UserProfile } from '@/models/user'
import { UserProfileData, UserProfileDataInterface } from '@/models/user-profile'

import { ChangePasswordRequest } from '@/models/requests/change-password'
import { ChangeProfileRequest } from '@/models/requests/change-profile'

import Api from '@/services/api'

class AccountService {
    async changePassword (request: ChangePasswordRequest): Promise<void> {
        await axios.put(Api.user.changePassword, request)
    }

    async changeProfile (request: ChangeProfileRequest): Promise<void> {
        await axios.put(Api.user.profile.update, request)
    }

    async userTestsData (): Promise<UserProfileData> {
        const response = await axios.get<UserProfileDataInterface>(Api.user.userTestsData)

        return UserProfileData.fromInterface(response.data)
    }

    async userProfile (): Promise<UserProfile> {
        const response = await axios.get<UserProfile>(Api.user.profile.read)

        return response.data
    }
}

export default new AccountService()
