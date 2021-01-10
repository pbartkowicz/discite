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
        question.isMultipleChoice = question.correctAnswers.length > 1
        question.tips = csvQuestion.tips ?? undefined

        return question
    }
}

export {
    Question
}
