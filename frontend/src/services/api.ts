export default {
    auth: {
        token: {
            get: 'api/token',
            refresh: 'api/token/refresh'
        }
    },
    // TODO: Fill the api
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
        }
    },
    user: {
        password: '',
        profile: '',
        changeProfile: ''
    }
}
