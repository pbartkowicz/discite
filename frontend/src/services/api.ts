export default {
    auth: {
        jwt: {
            obtain: 'auth/obtain_token',
            refresh: 'auth/refresh_token'
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
    }
}
