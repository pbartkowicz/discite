from django.core.exceptions import SuspiciousOperation

from discite_app.models import Test


def create_test(data, current_user):
    if validate_test(data):
        test = Test(name=data['name'], description=data['description'], is_public=False, user=current_user)
        test.save()
    else:
        raise SuspiciousOperation('Invalid create test request')


def validate_test(data):
    return True
