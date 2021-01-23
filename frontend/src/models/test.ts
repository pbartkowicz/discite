import { CsvQuestion } from '@/models/file-loaded/csv'
import { QuestionInterface, Question } from '@/models/question'

interface TestInterface {
    id: number
    name: string
    description: string
    questions: Array<QuestionInterface>
    created_at: string
}

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

    public static fromInterface (testInterface: TestInterface): Test {
        const test = new Test()

        test.id = testInterface.id
        test.description = testInterface.description
        test.questions = testInterface.questions.map(question => Question.fromInterface(question))
        test.created_at = testInterface.created_at

        return test
    }

    get result (): string {
        // TODO
        return `${Math.round(Math.random() * 100)}%`
    }
}

export {
    TestInterface,
    Test
}
