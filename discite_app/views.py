import json

from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.authentication import JWTAuthentication

from discite_app.services import show_test_service, create_test_service, submit_test_service, user_services, \
    user_profile_service, manage_test_services

jwt = JWTAuthentication()


def show_test(request, test_id):
    try:
        auth_tuple = jwt.authenticate(request)
        current_user = auth_tuple[0]
    except:
        current_user = None
    return JsonResponse(show_test_service.show_test(test_id, current_user))


@csrf_exempt
def create_test(request):
    try:
        auth_tuple = jwt.authenticate(request)
        current_user = auth_tuple[0]
    except:
        return HttpResponse('Unathorized', status=401)

    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        create_test_service.create_test(data, current_user)
        return HttpResponse('')


@csrf_exempt
def submit_test(request, test_id):
    try:
        auth_tuple = jwt.authenticate(request)
        current_user = auth_tuple[0]
    except:
        return HttpResponse('Unathorized', status=401)

    if request.method == 'PUT':
        data = json.loads(request.body.decode('utf-8'))
        submit_test_service.submit_test(data, current_user, test_id)
        return HttpResponse('')


@csrf_exempt
def change_test_public(request, test_id):
    try:
        auth_tuple = jwt.authenticate(request)
        current_user = auth_tuple[0]
    except:
        return HttpResponse('Unathorized', status=401)

    if request.method == 'PUT':
        data = json.loads(request.body.decode('utf-8'))
        manage_test_services.change_test_public_state(data, current_user, test_id)
        return HttpResponse('')


@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        user_services.register_user(data)
        return HttpResponse('')


def get_user_info(request):
    try:
        auth_tuple = jwt.authenticate(request)
        current_user = auth_tuple[0]
    except:
        return HttpResponse('Unathorized', status=401)

    return JsonResponse(user_services.get_user_info(current_user))


@csrf_exempt
def change_user_nick(request):
    try:
        auth_tuple = jwt.authenticate(request)
        current_user = auth_tuple[0]
    except:
        return HttpResponse('Unathorized', status=401)

    if request.method == 'PUT':
        data = json.loads(request.body.decode('utf-8'))
        user_services.change_user_nick(data, current_user)
        return HttpResponse('')


@csrf_exempt
def change_user_password(request):
    try:
        auth_tuple = jwt.authenticate(request)
        current_user = auth_tuple[0]
    except:
        return HttpResponse('Unathorized', status=401)

    if request.method == 'PUT':
        data = json.loads(request.body.decode('utf-8'))
        user_services.change_user_password(data, current_user)
        return HttpResponse('')


def get_user_profile(request):
    try:
        auth_tuple = jwt.authenticate(request)
        current_user = auth_tuple[0]
    except:
        return HttpResponse('Unathorized', status=401)

    if request.method == 'GET':
        return JsonResponse(user_profile_service.get_user_profile(current_user))
