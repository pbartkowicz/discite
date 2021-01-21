from discite_app.models import Test


def show_test(test_id):
    test = Test.objects.get(id=test_id)
    questions = test.question_set.all()
    questions_dto = list(map(map_question_to_question_dto, questions))

    return {
        'id': test.id,
        'name': test.name,
        'description': test.description,
        'createdAt': test.created_at,
        'questions': questions_dto
    }


def map_question_to_question_dto(question):
    answers = question.answer_set.all()
    correct_answers_indexes = []
    answers_values = []

    for i in range(len(answers)):
        if answers[i].is_correct:
            correct_answers_indexes.append(i)
        answers_values.append(answers[i].value)

    return {
        'id': question.id,
        'question': question.question,
        'answers': answers_values,
        'correctAnswers': correct_answers_indexes,
        'tips': question.tips,
        'isMultipleChoice': len(correct_answers_indexes) > 1
    }
