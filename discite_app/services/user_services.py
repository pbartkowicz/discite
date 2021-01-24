from django.contrib.auth.models import User
from django.core.exceptions import SuspiciousOperation
from django.db import transaction

from discite_app.models import UserProfile


@transaction.atomic
def register_user(data):
    if validate_register_data(data):
        user = User.objects.create_user(username=data['login'], email=data['email'], password=data['password'])
        UserProfile.objects.create(user=user, name=data['login'], email=data['email'], is_premium=False)
    else:
        raise SuspiciousOperation('Invalid register request')


def validate_register_data(data):
    if ('login' not in data) or ('email' not in data) or ('password' not in data):
        return False
    login_len = len(data['login'])
    if login_len > 50 or login_len < 5:
        return False
    email_len = len(data['email'])
    if email_len > 50 or email_len < 5:
        return False
    password_len = len(data['password'])
    if password_len > 50 or password_len < 5:
        return False

    return True


def get_user_info(user):
    return {
        'email': user.userprofile.email,
        'nickname': user.userprofile.name
    }


def change_user_nick(data, user):
    if validate_change_nick_data(data):
        user.userprofile.name = data['nickname']
        user.userprofile.save()
    else:
        raise SuspiciousOperation('Invalid change nick request')


def validate_change_nick_data(data):
    if 'nickname' not in data:
        return False
    nick_len = len(data['nickname'])
    if nick_len > 50 or nick_len < 5:
        return False

    return True


def change_user_password(data, user):
    if validate_change_password_data(data, user):
        user.set_password(data['new'])
        user.save()
    else:
        raise SuspiciousOperation('Invalid change password request')


def validate_change_password_data(data, user):
    if ('new' not in data) or ('old' not in data) or ('confirmation' not in data):
        return False
    pass_len = len(data['new'])
    if pass_len > 50 or pass_len < 5:
        return False
    if data['new'] != data['confirmation']:
        return False
    if not user.check_password(data['old']):
        return False

    return True
