interface AuthModuleState {
    email: string
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