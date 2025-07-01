from django.urls import path
from . import views

urlpatterns = [
    path('analyze/', views.analyze_job_description, name='analyze_job_description'),
]       