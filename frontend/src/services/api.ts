export default {
    auth: {
        token: {
            get: 'api/token',
            refresh: 'api/token'
        }
    },
    // TODO: Fill the api
    test: {
        create: '',
        read (id: number): string {
            return ''
        },
        update (id: number): string {
            return ''
        },
        delete (id: number): string {
            return ''
        }
    },
    user: {
        password: '',
        profile: ''
    }
}
