from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel
from typing import List, Dict, Optional
from datetime import datetime
from app.core.dummy_db import playbooks_db
from app.api.v1.auth import get_current_user_dummy

router = APIRouter()

class Playbook(BaseModel):
    id: int
    trigger_type: str
    sentiment_threshold: float
    template_text: str
    last_used: Optional[datetime] = None

class PlaybookCreate(BaseModel):
    trigger_type: str
    sentiment_threshold: float
    template_text: str

@router.get("/", response_model=List[Playbook])
async def get_playbooks(current_user: Dict = Depends(get_current_user_dummy)):
    return playbooks_db

@router.post("/", response_model=Playbook, status_code=status.HTTP_201_CREATED)
async def create_playbook(playbook_data: PlaybookCreate, current_user: Dict = Depends(get_current_user_dummy)):
    new_id = max(p["id"] for p in playbooks_db) + 1 if playbooks_db else 1
    new_playbook = {
        "id": new_id,
        "trigger_type": playbook_data.trigger_type,
        "sentiment_threshold": playbook_data.sentiment_threshold,
        "template_text": playbook_data.template_text,
        "last_used": None,
    }
    playbooks_db.append(new_playbook)
    return new_playbook

@router.post("/{playbook_id}/apply", response_model=Playbook)
async def apply_playbook(playbook_id: int, current_user: Dict = Depends(get_current_user_dummy)):
    playbook = next((p for p in playbooks_db if p["id"] == playbook_id), None)
    if not playbook:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Playbook not found")
    playbook["last_used"] = datetime.now()
    # In a real scenario, this would trigger an action (e.g., sending an email, posting a tweet)
    return playbook