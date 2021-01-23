from discite_app.models import Test, TestResult


def show_test(test_id, user):
    test = Test.objects.get(id=test_id)
    questions = test.question_set.all()
    questions_dto = list(map(map_question_to_question_dto, questions))

    test = {
        'id': test.id,
        'name': test.name,
        'description': test.description,
        'createdAt': test.created_at,
        'questions': questions_dto
    }

    test_results_dto = None
    if user is not None:
        test_result = optional_get_test_result(test_id, user.id)
        if test_result is not None:
            test_results_dto = prepare_test_results_dto(test_result, questions_dto)

    return {
        'test': test,
        'results': test_results_dto
    }


def map_question_to_question_dto(question):
    answers = question.answer_set.all()
    correct_answers_indexes = []
    answers_dto = []

    for i in range(len(answers)):
        if answers[i].is_correct:
            correct_answers_indexes.append(i)
        answers_dto.append({
            'id': answers[i].id,
            'value': answers[i].value
        })

    return {
        'id': question.id,
        'question': question.question,
        'answers': answers_dto,
        'correctAnswers': correct_answers_indexes,
        'tips': question.tips,
        'isMultipleChoice': len(correct_answers_indexes) > 1
    }


def prepare_test_results_dto(test_result, questions_dto):
    user_test_answers = test_result.testresultanswer_set.all()

    results_array = []
    for question_dto in questions_dto:
        answers_of_question_array = []
        answers_dto = question_dto['answers']
        for i in range(len(answers_dto)):
            if user_marked_answer(user_test_answers, answers_dto[i]['id']):
                answers_of_question_array.append(i)
        results_array.append(answers_of_question_array)

    return {
        'id': test_result.id,
        'test_id': test_result.test_id,
        'correct': test_result.correct,
        'partially_correct': test_result.partially_correct,
        'wrong': test_result.wrong,
        'results': results_array
    }


def user_marked_answer(user_test_answers, answer_id):
    return any(user_test_answer.answer_id == answer_id for user_test_answer in user_test_answers)


def optional_get_test_result(test_id, user_id):
    try:
        return TestResult.objects.get(test_id=test_id, user=user_id)
    except TestResult.DoesNotExist:
        return None
