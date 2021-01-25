import { Module, VuexModule, Mutation, Action, config } from 'vuex-module-decorators'

import { Test as TestModel } from '@/models/test'
import { TestResults, TestResultsUpdatePayload } from '@/models/test-results'

import { TestModuleState } from '@/store/types'
import { Question } from '@/models/question'

import TestService from '@/services/test-service'

config.rawError = true

@Module({ name: 'test', namespaced: true, stateFactory: true })
export default class Test extends VuexModule implements TestModuleState {
    currentQuestionIdx = 0
    checked = false
    revealed = false

    isFromFile = false
    isLoaded = false

    test = new TestModel()
    testResults = new TestResults()

    // region Mutations

    @Mutation
    setIsLoaded (payload: boolean): void {
        this.isLoaded = payload
    }

    @Mutation
    setIsFromFile (payload: boolean): void {
        this.isFromFile = payload
    }

    @Mutation
    decrementCurrentQuestion (): void {
        this.currentQuestionIdx--
    }

    @Mutation
    incrementCurrentQuestion (): void {
        this.currentQuestionIdx++
    }

    @Mutation
    goToFirstQuestion (): void {
        this.currentQuestionIdx = 0
    }

    @Mutation
    setChecked (payload: boolean): void {
        this.checked = payload
    }

    @Mutation
    setRevealed (payload: boolean): void {
        this.revealed = payload
    }

    @Mutation
    setTest (payload: TestModel): void {
        this.test = payload

        // Reset data, because we have new test
        this.checked = false
        this.revealed = false
        this.currentQuestionIdx = 0
        this.testResults = new TestResults()
    }

    @Mutation
    updateTestsResults (payload: TestResultsUpdatePayload): void {
        this.testResults.update(this.currentQuestionIdx, payload)
    }

    // endregion

    // region Actions

    @Action
    nextQuestion (): void {
        this.setChecked(false)
        this.setRevealed(false)

        this.incrementCurrentQuestion()
    }

    @Action
    async loadTest (id: number): Promise<void> {
        this.setTest(await TestService.read(id))
        this.setIsFromFile(false)
        this.setIsLoaded(true)
    }

    // endregion

    // region Getters

    get currentQuestion (): Question {
        return this.test.questions[this.currentQuestionIdx] ?? new Question()
    }

    get currentQuestionAnswers (): Array<number> {
        return this.testResults.results[this.currentQuestionIdx] ?? []
    }

    get isFirstQuestion (): boolean {
        return this.currentQuestionIdx === 0
    }

    get isLastQuestion (): boolean {
        return this.currentQuestionIdx === this.test.questions.length - 1
    }

    // endregion
}
