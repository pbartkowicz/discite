import { CsvQuestion } from '@/models/file-loaded/csv'
import { Question } from '@/models/question'

class Test {
    id: number = 0
    name: string = ''
    description: string = ''
    questions: Array<Question> = []

    created_at: string = ''

    public static fromCsvQuestions(csvQuestions: Array<CsvQuestion>) {
        const test = new Test()

        test.questions = csvQuestions.map(csvQuestion => Question.fromCsvQuestion(csvQuestion))

        return test
    }

    get result (): string {
        // TODO
        return `${Math.round(Math.random() * 100)}%`
    }
}

export {
    Test
}
