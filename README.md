# Reputation & Sentiment Radar

This repository contains the codebase for the Reputation & Sentiment Radar application, designed to monitor online channels for real-time sentiment analysis.

## Project Structure

- `backend/`: Contains the FastAPI backend application.
- `frontend/`: Contains the React frontend application.

## Getting Started

## For Frontent

cd .\frontend\

npm install

npm start

## For Backend

cd .\backend\
 
python -m venv venv
 
.\venv\Scripts\activate  
 
pip install --trusted-host pypi.org --trusted-host pypi.python.org --trusted-host files.pythonhosted.org uvicorn fastapi  pydantic python-jose[cryptography] passlib[bcrypt] python-multipart pydantic-settings
 
uvicorn app.main:app --reload --port 8000

## Important Notes

- This is a dummy implementation using in-memory data for demonstration purposes.
- Real-time data ingestion, advanced NLP, and persistent databases are not included.
- Authentication is simplified and not production-ready.
- The project code is currently not integrated with external APIs and models due to pricing constraints. If this product is developed further, it has the placeholders in place to replace current dummy data with real-time data from platforms and further utilise them through models.