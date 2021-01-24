from discite_app.models import TestResult
from discite_app.services import achievement_services


def get_user_profile(user):
    user_created_tests = user.test_set.all()
    user_solved_tests = TestResult.objects.filter(user=user).select_related('test').all()

    user_created_tests_summaries = list(map(map_to_test_summary, user_created_tests))
    user_solved_tests_summaries = list(map(map_to_solved_test_summary, user_solved_tests))

    achievement_dtos = achievement_services.get_achievements_summary(user)

    return {
        'my_tests': user_created_tests_summaries,
        'solved_tests': user_solved_tests_summaries,
        'unfinished_tests': [],  # TODO: finish
        'achievements': achievement_dtos
    }


def map_to_test_summary(test):
    return {
        'id': test.id,
        'name': test.name,
        'description': test.description,
        'questionsNum': test.question_set.count(),
        'createdAt': test.created_at.strftime('%d/%m/%Y %H:%M')
    }


def map_to_solved_test_summary(test_result):
    return {
        'id': test_result.test.id,
        'name': test_result.test.name,
        'description': test_result.test.description,
        'correct': test_result.correct,
        'wrong': test_result.wrong,
        'partially_correct': test_result.partially_correct
    }
