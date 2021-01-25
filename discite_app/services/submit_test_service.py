from django.core.exceptions import SuspiciousOperation
from django.db import transaction

from discite_app.models import Answer, TestResult, TestResultAnswer, Question, Test
from discite_app.services import achievement_services
from discite_app.services.test_validations import check_test_public_or_users


@transaction.atomic
def submit_test(data, user, test_id):
    check_test_public_or_users(Test.objects.get(id=test_id), user)

    user_new_answer_ids = list(map(lambda x: int(x), data['answers']))
    possible_test_answer_ids = list(Answer.objects.filter(question__test_id=test_id).values_list('id', flat=True))
    validate_answers(possible_test_answer_ids, user_new_answer_ids)

    test_questions = Question.objects.filter(test_id=test_id).prefetch_related('answers').all()
    result_summary = calculate_result_summary(test_questions, user_new_answer_ids)

    test_result_get_or_create_result = TestResult.objects.get_or_create(test_id=test_id, user_id=user.id,
                                                                        defaults={'correct': 0,
                                                                                  'partially_correct': 0,
                                                                                  'wrong': 0})
    test_result = test_result_get_or_create_result[0]
    test_result.correct = result_summary['correct']
    test_result.partially_correct = result_summary['partially_correct']
    test_result.wrong = result_summary['wrong']
    test_result.save()

    TestResultAnswer.objects.filter(test_result=test_result).delete()
    for user_new_answer_id in user_new_answer_ids:
        TestResultAnswer.objects.create(test_result=test_result, answer_id=user_new_answer_id)

    achievement_services.update_user_solve_achievements(test_result, user)


def validate_answers(possible_test_answer_ids, user_new_answer_ids):
    if not all(elem in possible_test_answer_ids for elem in user_new_answer_ids):
        raise SuspiciousOperation('Illegal answers')


def calculate_result_summary(test_questions, user_new_answer_ids):
    questions_correct = 0
    questions_partially_correct = 0
    questions_wrong = 0
    for test_question in test_questions:
        total = 0
        total_correct = 0
        points = 0
        for answer in test_question.answers.all():
            total += 1
            user_answered = answer.id in user_new_answer_ids
            if answer.is_correct:
                total_correct += 1
                if user_answered:
                    points += 1
            elif user_answered:
                points -= 1
        if points == total_correct:
            questions_correct += 1
        elif points > 0:
            questions_partially_correct += 1
        else:
            questions_wrong += 1
    return {
        'correct': questions_correct,
        'partially_correct': questions_partially_correct,
        'wrong': questions_wrong
    }
