from django.contrib.auth.models import User
from django.db import models


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    is_premium = models.BooleanField()


class Avatar(models.Model):
    user_profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)

    name = models.CharField(max_length=50)
    image_url = models.CharField(max_length=500)
    is_for_premium = models.BooleanField()


class Test(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    name = models.CharField(max_length=100)
    description = models.TextField(max_length=250)
    is_public = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)


class Question(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE)

    tips = models.TextField(max_length=500)
    question = models.TextField(max_length=500)
    is_certain = models.BooleanField()


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')

    value = models.TextField(max_length=500)
    is_correct = models.BooleanField()
    is_certain = models.BooleanField()


class TestResult(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    correct = models.IntegerField()
    partially_correct = models.IntegerField()
    wrong = models.IntegerField()

    created_at = models.DateTimeField(auto_now_add=True)


class TestResultAnswer(models.Model):
    test_result = models.ForeignKey(TestResult, on_delete=models.CASCADE)
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE)


class Comment(models.Model):
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    value = models.TextField(max_length=500)

# TODO: achievement, statistics
