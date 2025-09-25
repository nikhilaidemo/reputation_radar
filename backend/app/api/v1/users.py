from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel
from typing import List, Dict
from datetime import datetime
from app.core.dummy_db import users_db
from app.api.v1.auth import get_current_user_dummy

router = APIRouter()

class User(BaseModel):
    id: int
    email: str
    role: str
    created_at: datetime

class UserCreate(BaseModel):
    email: str
    password: str
    role: str

@router.get("/", response_model=List[User])
async def get_users(current_user: Dict = Depends(get_current_user_dummy)):
    # In a real app, only admins might see all users
    return users_db

@router.post("/", response_model=User, status_code=status.HTTP_201_CREATED)
async def create_user(user_data: UserCreate, current_user: Dict = Depends(get_current_user_dummy)):
    # Basic check for existing user (email)
    if any(u["email"] == user_data.email for u in users_db):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User with this email already exists")

    new_id = max(u["id"] for u in users_db) + 1 if users_db else 1
    new_user = {
        "id": new_id,
        "email": user_data.email,
        "password_hash": user_data.password, # Storing plaintext for dummy, NOT PRODUCTION
        "role": user_data.role,
        "created_at": datetime.now(),
    }
    users_db.append(new_user)
    # Return a model that doesn't expose password_hash
    return User(
        id=new_user["id"],
        email=new_user["email"],
        role=new_user["role"],
        created_at=new_user["created_at"]
    )