import json

from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.authentication import JWTAuthentication

from discite_app.services import show_test_service, create_test_service

jwt = JWTAuthentication()


def show_test(request, test_id):
    return JsonResponse(show_test_service.show_test(test_id))


@csrf_exempt
def create_test(request):
    auth_tuple = jwt.authenticate(request)
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        current_user = auth_tuple[0]
        create_test_service.create_test(data, current_user)
        return HttpResponse('')
