import { CsvQuestion } from '@/models/file-loaded/csv'

class Question {
    question = ''
    answers: Array<string> = []
    correctAnswers: Array<number> = []
    tips: string | undefined = undefined

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
        question.tips = csvQuestion.tips

        return question
    }
}

export {
    Question
}
