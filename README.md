# AI JD Analyzer 🔍💼

An AI-powered web platform that helps candidates analyze job descriptions and suggests key concepts, skills, and possible interview questions.

## Features
- Upload or paste a Job Description
- Get AI-driven analysis using OpenAI or Gemini
- See required skills, concepts, and suggested questions
- React frontend + Django backend

## Tech Stack
- Django REST Framework
- React + Tailwind
- OpenRouter API - You can generate and get access for this API for free from OpenRouters website, choose the model you like, append the model's name in /views.py and you can generate the responses.
- PDF / Text analysis

## Setup
```bash
# Backend
cd backend
pip install -r requirements.txt
python manage.py runserver

# Frontend
cd frontend
npm install
npm run dev
