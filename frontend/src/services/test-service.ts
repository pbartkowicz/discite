import axios from 'axios'

import {Test, TestInterface} from '@/models/test'
import { TestResults } from '@/models/test-results'

import Api from '@/services/api'

class TestService {
    async create (test: Test): Promise<void> {
        await axios.post(Api.test.create, TestService.modelToRequest(test))
    }

    async read (id: number): Promise<Test> {
        const response = await axios.get<{
            results: unknown, // TODO
            test: TestInterface
        }>(Api.test.read(id))

        return Test.fromInterface(response.data.test)
    }

    async update (test: Test): Promise<void> {
        await axios.put(Api.test.update(test.id), TestService.modelToRequest(test))
    }

    async delete (id: number): Promise<void> {
        await axios.delete(Api.test.delete(id))
    }

    async submitResults (id: number, results: TestResults): Promise<void> {
        await axios.put(Api.test.submitResults(id), TestService.resultsToRequest(results))
    }

    async changePublic (id: number, isPublic: boolean): Promise<void> {
        await axios.put(Api.test.changePublic(id), {
            isPublic: isPublic
        })
    }

    private static resultsToRequest (results: TestResults): Record<string, unknown> {
        return {
            answers: results.allAnswers
        }
    }

    private static modelToRequest (test: Test): Record<string, unknown> {
        return {
            name: test.name,
            description: test.description,
            questions: test.questions.map(q => {
                return {
                    question: q.question,
                    tips: q.tips,
                    answers: q.answers.map(answer => {
                        return answer.value
                    }),
                    correctAnswers: q.correctAnswers
                }
            })
        }
    }
}

export default new TestService()
