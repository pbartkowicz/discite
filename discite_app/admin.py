from django.contrib import admin

from discite_app.models import UserProfile, Avatar, Test, Question, Answer, Comment

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Avatar)
admin.site.register(Test)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(Comment)
