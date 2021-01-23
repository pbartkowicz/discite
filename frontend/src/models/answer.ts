interface AnswerInterface {
    id: number
    value: string
}

class Answer {
    constructor(public id: number, public value: string) {

    }

    public static fromInterface(answer: AnswerInterface): Answer {
        return new Answer(answer.id, answer.value)
    }
}

export {
    AnswerInterface,
    Answer
}
