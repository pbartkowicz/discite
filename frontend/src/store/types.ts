import { Test } from '@/models/test'
import { TestResults } from '@/models/test-results'

interface AuthModuleState {
    login: string
    password: string
    token: string
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
    TestModuleState,

    StoreState
}