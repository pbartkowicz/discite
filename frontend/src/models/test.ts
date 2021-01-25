import { CsvQuestion } from '@/models/file-loaded/csv'
import { Question, QuestionInterface } from '@/models/question'

interface TestInterface {
    id: number
    name: string
    description: string
    questions: Array<QuestionInterface>
    questionsNum?: number
    createdAt: string

    correct?: number
    wrong?: number
    partially_correct?: number
}

class Test {
    id: number = 0
    name: string = ''
    description: string = ''
    questions: Array<Question> = []

    correct?: number
    wrong?: number
    partially_correct?: number

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

        // Test results if coming from results
        test.correct = testInterface.correct
        test.wrong = testInterface.wrong
        test.partially_correct = testInterface.partially_correct

        return test
    }
}

export {
    TestInterface,
    Test
}
