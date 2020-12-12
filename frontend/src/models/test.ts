import { CsvQuestion } from '@/models/file-loaded/csv'
import { Question } from '@/models/question'

class Test {
    questions: Array<Question> = []

    public static fromCsvQuestions(csvQuestions: Array<CsvQuestion>) {
        const test = new Test()

        test.questions = csvQuestions.map(csvQuestion => Question.fromCsvQuestion(csvQuestion))

        return test
    }
}

export {
    Test
}
