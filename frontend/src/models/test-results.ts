type TestResultsUpdatePayload = {
    answers: Array<number>
    correct: boolean
    partiallyCorrect: boolean
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
}

export {
    TestResults,
    TestResultsUpdatePayload
}