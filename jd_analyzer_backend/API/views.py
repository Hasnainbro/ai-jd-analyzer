# api/views.py
import re
import json
import requests
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.conf import settings
from .models import JobDescription, AnalysisResult
from .serializers import JobDescriptionSerializer, AnalysisResultSerializer
from .utils import extract_text_from_pdf

@api_view(['POST'])
@parser_classes([JSONParser])
def analyze_job_description(request):
    """
    Analyze job description text
    """
    content = request.data.get('jobDescription', '')
    
    if not content:
        return Response({'error': 'No job description provided'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Save job description
    job_description = JobDescription.objects.create(content=content)
    
    # Call Gemini API via OpenRouter
    try:
        result = call_gemini_api(content)

        if not isinstance(result, dict):
            raise ValueError("AI response is not a dictionary")
        
        # Save analysis result
        analysis_result = AnalysisResult.objects.create(
            job_description=job_description,
            summary=result.get('summary', ''),
            key_requirements=result.get('keyRequirements', []),
            potential_questions=result.get('potentialQuestions', []),
            preparation_tips=result.get('preparationTips', [])
        )
        
        # Return the result in the format expected by the frontend
        return Response({
            'summary': result.get('summary', ''),
            'key_requirements': result.get('keyRequirements', []),
            'potential_questions': result.get('potentialQuestions', []),
            'preparation_tips': result.get('preparationTips', [])
        })
            
    except Exception as e:
        import traceback
        print("🔥 AI Analysis Failed:")
        print(traceback.format_exc())  # Full error trace in your terminal
        return Response({'error': 'AI call failed', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def analyze_pdf(request):
    """
    Extract text from PDF and analyze it
    """
    if 'file' not in request.FILES:
        return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
    
    pdf_file = request.FILES['file']
    
    # Check if it's a PDF
    if not pdf_file.name.endswith('.pdf'):
        return Response({'error': 'File must be a PDF'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Extract text from PDF
    try:
        content = extract_text_from_pdf(pdf_file)
        
        if not content:
            return Response({'error': 'Could not extract text from PDF'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Save job description
        job_description = JobDescription.objects.create(content=content)
        
        # Call Gemini API
        result = call_gemini_api(content)
        
        # Save analysis result
        analysis_result = AnalysisResult.objects.create(
            job_description=job_description,
            summary=result.get('summary', ''),
            key_requirements=result.get('keyRequirements', []),
            potential_questions=result.get('potentialQuestions', []),
            preparation_tips=result.get('preparationTips', [])
        )
        
        # Return the result in the format expected by the frontend
        return Response({
            'summary': result.get('summary', ''),
            'key_requirements': result.get('keyRequirements', []),
            'potential_questions': result.get('potentialQuestions', []),
            'preparation_tips': result.get('preparationTips', [])
        })
            
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def call_gemini_api(content):
    prompt = f"""
    Analyze the following job description and provide:
    1. A brief summary of the position
    2. Key requirements and skills needed
    3. Potential interview questions based on the requirements
    4. Preparation tips for the interview

    Job Description:
    {content}

    Format your response as a JSON object with the following structure:
    {{
        "summary": "...",
        "keyRequirements": ["..."],
        "potentialQuestions": ["..."],
        "preparationTips": ["..."]
    }}
    """

    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {settings.OPENROUTER_API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "google/gemini-2.0-flash-001",
            "messages": [{"role": "user", "content": prompt}],
            # Remove response_format for now
        }
    )

    response_data = response.json()

    try:
        result_text = response_data['choices'][0]['message']['content'].strip()

        # Remove Markdown code block if present
        if result_text.startswith("```json"):
            result_text = re.sub(r"^```json\s*|\s*```$", "", result_text.strip(), flags=re.DOTALL)

        return json.loads(result_text)

    except (KeyError, IndexError, json.JSONDecodeError) as e:
        raise Exception(f"Failed to parse AI response: {str(e)}")