from django.db import models

class JobDescription(models.Model):
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
class AnalysisResult(models.Model):
    job_description = models.ForeignKey(JobDescription, on_delete=models.CASCADE)
    summary = models.TextField()
    key_requirements = models.JSONField()
    potential_questions = models.JSONField()
    preparation_tips = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)