export default {
    auth: {
        token: {
            get: 'api/token',
            refresh: 'api/token/refresh'
        },
        signUp: 'api/user/register'
    },
    test: {
        create: 'api/test',
        read (id: number): string {
            return `api/test/${id}`
        },
        update (id: number): string {
            return `api/test/${id}`
        },
        delete (id: number): string {
            return `api/test/${id}`
        },
        submitResults (id: number): string {
            return `api/test/${id}/submit`
        },
        changePublic (id: number): string {
            return `api/test/${id}/public`
        }
    },
    user: {
        userTestsData: 'api/user/profile',
        changePassword: 'api/user/password',
        profile: {
            read: 'api/user/info',
            update: 'api/user/nick'
        }
    }
}
