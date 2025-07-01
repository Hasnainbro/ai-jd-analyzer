from rest_framework import serializers
from .models import JobDescription, AnalysisResult

class JobDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobDescription
        fields = ['id', 'content', 'created_at']

class AnalysisResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalysisResult
        fields = ['id', 'summary', 'key_requirements', 'potential_questions', 'preparation_tips', 'created_at']