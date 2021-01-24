from django.core.exceptions import SuspiciousOperation
from django.db import transaction

from discite_app.models import Test, Question, Answer
from discite_app.services import achievement_services


@transaction.atomic
def create_test(data, current_user):
    if validate_test(data):
        test = Test(name=data['name'], description=data['description'], is_public=False, user=current_user)
        test.save()

        for json_question in data['questions']:
            if 'tips' in json_question:
                tips = json_question['tips']
            else:
                tips = ''
            question = Question(test=test, tips=tips, question=json_question['question'], is_certain=True)
            question.save()

            json_answers = json_question['answers']
            json_correct_answers = json_question['correctAnswers']
            for i in range(len(json_answers)):
                is_answer_correct = (i + 1) in json_correct_answers
                answer = Answer(question=question, value=json_answers[i], is_certain=True, is_correct=is_answer_correct)
                answer.save()

        achievement_services.update_user_create_achievements(current_user)
    else:
        raise SuspiciousOperation('Invalid create test request')


def validate_test(data):
    if len(data['name']) > 100: return False
    if len(data['description']) > 250: return False
    questions = data['questions']
    if len(questions) < 1: return False
    for question in questions:
        if 'tips' in question and len(question['tips']) > 250: return False
        if len(question['question']) > 250: return False

        answers = question['answers']
        correct_answers = question['correctAnswers']
        if len(answers) < 1 or len(correct_answers) < 1: return False
        for answer in answers:
            if len(answer) > 500: return False

    return True
