from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import Dict
from app.core.dummy_db import users_db
from app.core.security import create_access_token

router = APIRouter()

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

@router.post("/login", response_model=Token)
async def login_for_access_token(user_data: UserLogin):
    user = next((u for u in users_db if u["email"] == user_data.email), None)
    if not user or user["password_hash"] != user_data.password: # Dummy password check
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user["email"], "role": user["role"]})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/refresh", response_model=Token)
async def refresh_token(current_user: Dict = Depends(create_access_token)): # Simplified for dummy
    # In a real app, this would take a refresh token and issue a new access token
    # For dummy, we just issue a new one based on current_user (which isn't really checked here)
    new_access_token = create_access_token(data={"sub": current_user["sub"], "role": current_user["role"]})
    return {"access_token": new_access_token, "token_type": "bearer"}

# Dummy dependency to simulate getting current user from a token
async def get_current_user_dummy() -> Dict:
    # In a real app, this would decode and validate a JWT
    return {"email": "pr_manager@example.com", "role": "pr_manager"}