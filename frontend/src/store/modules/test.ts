import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

import { Test as TestModel } from '@/models/test'
import { TestResults, TestResultsUpdatePayload } from '@/models/test-results'

import { TestModuleState } from '@/store/types'
import {Question} from "@/models/question";

@Module({ name: 'test', namespaced: true, stateFactory: true })
export default class Test extends VuexModule implements TestModuleState {
    currentQuestionIdx = 0
    checked = false
    revealed = false

    test = new TestModel()
    testResults = new TestResults()

    // region Mutations

    @Mutation
    incrementCurrentQuestion (): void {
        this.currentQuestionIdx++
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
        this.testResults.update(payload)
    }

    // endregion

    // region Actions

    @Action
    nextQuestion (): void {
        this.setChecked(false)
        this.setRevealed(false)

        this.incrementCurrentQuestion()
    }


    // endregion

    // region Getters

    get currentQuestion (): Question {
        return this.test.questions[this.currentQuestionIdx]
    }

    get isLastQuestion (): boolean {
        return this.currentQuestionIdx === this.test.questions.length - 1
    }

    // endregion
}
