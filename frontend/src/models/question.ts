import { Answer } from '@/models/answer'
import { CsvQuestion } from '@/models/file-loaded/csv'

class Question {
    question = ''
    answers: Array<Answer> = []
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
            new Answer(1, csvQuestion.answer1),
            new Answer(2, csvQuestion.answer2),
            new Answer(3, csvQuestion.answer3),
            new Answer(4, csvQuestion.answer4),
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
