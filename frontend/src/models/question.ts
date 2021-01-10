import { CsvQuestion } from '@/models/file-loaded/csv'

class Question {
    question = ''
    answers: Array<string> = []
    correctAnswers: Array<number> = []
    tips?: string = undefined
    isMultipleChoice: boolean = false

    get hasTips (): boolean {
        return this.tips !== '' && this.tips !== undefined
    }

    get isSingleChoice (): boolean {
        // TODO: Remove this
        return this.correctAnswers.length === 1
    }

    public static fromCsvQuestion(csvQuestion: CsvQuestion) {
        const question = new Question()

        question.question = csvQuestion.question
        question.answers = [
            csvQuestion.answer1,
            csvQuestion.answer2,
            csvQuestion.answer3,
            csvQuestion.answer4
        ]
        question.correctAnswers = [...csvQuestion.correct]
        question.tips = csvQuestion.tips ?? undefined

        return question
    }
}

export {
    Question
}
