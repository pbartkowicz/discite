import { CsvQuestion } from '@/models/file-loaded/csv'
import { Question, QuestionInterface } from '@/models/question'

interface TestInterface {
    id: number
    name: string
    description: string
    questions: Array<QuestionInterface>
    questionsNum?: number
    createdAt: string
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
        test.name = testInterface.name
        test.description = testInterface.description
        test.created_at = testInterface.createdAt

        if (testInterface.questionsNum) {
            test.questions = Array.from({ length: testInterface.questionsNum })
        } else {
            if (testInterface.questions) {
                test.questions = testInterface.questions.map(q => Question.fromInterface(q))
            } else {
                test.questions = []
            }
        }

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
