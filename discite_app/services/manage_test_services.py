from django.core.exceptions import SuspiciousOperation

from discite_app.models import Test


def change_test_public_state(data, user, test_id):
    test = Test.objects.get(id=test_id)
    if test.user_id != user.id:
        raise SuspiciousOperation('User is not the test creator!')
    test.is_public = data['isPublic']
    test.save()
