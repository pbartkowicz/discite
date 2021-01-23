import axios from 'axios'

import { Test } from '@/models/test'

import Api from '@/services/api'
import {TestResults} from "@/models/test-results";

class TestService {
    async create (test: Test): Promise<void> {
        await axios.post(Api.test.create, TestService.modelToRequest(test))
    }

    async read (id: number): Promise<Test> {
        const response = await axios.get<Test>(Api.test.read(id))

        return response.data
    }

    async update (test: Test): Promise<void> {
        await axios.patch(Api.test.update(test.id), TestService.modelToRequest(test))
    }

    async delete (id: number): Promise<void> {
        await axios.delete(Api.test.delete(id))
    }

    async submitResults (id: number, results: TestResults): Promise<void> {
        await axios.put(Api.test.submitResults(id), TestService.resultsToRequest(results))
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
