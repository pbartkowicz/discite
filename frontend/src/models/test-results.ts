type TestResultsUpdatePayload = {
    answers: Array<number>
    correct: boolean
    partiallyCorrect: boolean
}

interface TestsResultsInterface {
    correct: number
    partiallyCorrect: number
    wrong: number
    results: Record<number, Array<number>>
}

class TestResults {
    correct = 0
    partiallyCorrect = 0
    wrong = 0

    results: Record<number, Array<number>> = {}

    public update (question: number, { answers, correct, partiallyCorrect }: TestResultsUpdatePayload): void {
        this.results[question] = answers;

        if (correct) {
            this.correct++
        } else if (partiallyCorrect) {
            this.partiallyCorrect++
        } else {
            this.wrong++
        }
    }

    public static fromInterface(testResultsInterface: TestsResultsInterface): TestResults {
        const results = new TestResults()

        results.correct = testResultsInterface.correct
        results.partiallyCorrect = testResultsInterface.partiallyCorrect
        results.wrong = testResultsInterface.wrong
        results.results = testResultsInterface.results

        return results
    }
}

export {
    TestResults,
    TestResultsUpdatePayload
}