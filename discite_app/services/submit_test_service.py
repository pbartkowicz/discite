from django.core.exceptions import SuspiciousOperation
from django.db import transaction

from discite_app.models import Answer, TestResult, TestResultAnswer


@transaction.atomic
def submit_test(data, user, test_id):
    user_new_answer_ids = list(map(lambda x: int(x), data['answers']))
    possible_test_answer_ids = list(Answer.objects.filter(question__test_id=test_id).values_list('id', flat=True))
    validate_answers(possible_test_answer_ids, user_new_answer_ids)

    test_result = TestResult.objects.get_or_create(test_id=test_id, user_id=user.id)[0]
    user_new_answers = Answer.objects.filter(id__in=user_new_answer_ids).all()
    TestResultAnswer.objects.filter(test_result=test_result).delete()
    for user_new_answer in user_new_answers:
        TestResultAnswer.objects.create(test_result=test_result, answer=user_new_answer)


def validate_answers(possible_test_answer_ids, user_new_answer_ids):
    if not all(elem in possible_test_answer_ids for elem in user_new_answer_ids):
        raise SuspiciousOperation('Illegal answers')
