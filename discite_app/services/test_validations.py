from django.core.exceptions import SuspiciousOperation


def check_test_public_or_users(test, user):
    if test.is_public:
        return True
    elif user is not None and test.user_id == user.id:
        return True
    else:
        raise SuspiciousOperation('User is not the test creator and the test is not public')
