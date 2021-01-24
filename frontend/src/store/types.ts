import { Test } from '@/models/test'
import { TestResults } from '@/models/test-results'

interface AuthModuleState {
    login: string
    password: string
    accessToken: string
    refreshToken: string
}

interface ErrorsModuleState {
    error: string
}

interface SignUpModuleState {
    login: string
    email: string
    password: string
}

interface TestModuleState {
    currentQuestionIdx: number
    checked: boolean
    revealed: boolean

    test: Test
    testResults: TestResults
}

interface UserModuleState {
    email: string
    nickname: string
}

interface StoreState {
    auth: AuthModuleState
    errors: ErrorsModuleState
    signup: SignUpModuleState
    test: TestModuleState
    user: UserModuleState
}

type PartialStoreState = {
    [T in keyof StoreState]?: Partial<StoreState[T]>
}

export {
    AuthModuleState,
    ErrorsModuleState,
    SignUpModuleState,
    TestModuleState,
    UserModuleState,

    PartialStoreState, StoreState
}