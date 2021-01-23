import json

from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.authentication import JWTAuthentication

from discite_app.services import show_test_service, create_test_service, submit_test_service

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
