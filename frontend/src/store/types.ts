interface AuthModuleState {
    login: string
    password: string
    token: string
}

interface StoreState {
    auth: AuthModuleState
}

export {
    AuthModuleState,

    StoreState
}