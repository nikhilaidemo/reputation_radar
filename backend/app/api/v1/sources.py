from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel
from typing import List, Dict
from app.core.dummy_db import sources_db
from app.api.v1.auth import get_current_user_dummy

router = APIRouter()

class Source(BaseModel):
    id: int
    type: str
    name: str
    api_config: Dict
    is_active: bool

class SourceCreate(BaseModel):
    type: str
    name: str
    api_config: Dict

@router.get("/", response_model=List[Source])
async def get_sources(current_user: Dict = Depends(get_current_user_dummy)):
    return sources_db

@router.post("/", response_model=Source, status_code=status.HTTP_201_CREATED)
async def register_source(source_data: SourceCreate, current_user: Dict = Depends(get_current_user_dummy)):
    new_id = max(s["id"] for s in sources_db) + 1 if sources_db else 1
    new_source = {
        "id": new_id,
        "type": source_data.type,
        "name": source_data.name,
        "api_config": source_data.api_config,
        "is_active": True,
    }
    sources_db.append(new_source)
    return new_source