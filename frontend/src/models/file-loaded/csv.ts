interface CsvQuestion {
    question: string
    answer1: string
    answer2: string
    answer3: string
    answer4: string
    correct: Set<1 | 2 | 3 | 4>
    tips: string | null
}

export {
    CsvQuestion
}