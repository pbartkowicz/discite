import axios from 'axios'

import { Test } from '@/models/test'

import Api from '@/services/api'

class TestService {
    async create (test: Test): Promise<void> {
        await axios.post(Api.test.create, this.modelToRequest(test))
    }

    async read (id: number): Promise<Test> {
        const response = await axios.get<Test>(Api.test.read(id))

        return response.data
    }

    async update (test: Test): Promise<void> {
        await axios.patch(Api.test.update(test.id), this.modelToRequest(test))
    }

    async delete (id: number): Promise<void> {
        await axios.delete(Api.test.delete(id))
    }

    private modelToRequest (test: Test): Record<string, unknown> {
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
