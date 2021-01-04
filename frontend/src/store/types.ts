import { Test } from '@/models/test'
import { TestResults } from '@/models/test-results'

interface AuthModuleState {
    login: string
    password: string
    token: string
}

interface ErrorsModuleState {
    error: string
}

interface TestModuleState {
    currentQuestionIdx: number
    checked: boolean
    revealed: boolean

    test: Test
    testResults: TestResults
}

interface StoreState {
    auth: AuthModuleState
}

export {
    AuthModuleState,
    ErrorsModuleState,
    TestModuleState,

    StoreState
}