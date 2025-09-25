from fastapi import APIRouter, Query, Depends
from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import datetime
from app.core.dummy_db import posts_db, sources_db
from app.api.v1.auth import get_current_user_dummy # Use dummy for now

router = APIRouter()

class Post(BaseModel):
    id: int
    source_id: int
    content: str
    author: str
    url: Optional[str] = None
    timestamp: datetime
    sentiment_score: float
    sentiment_label: str
    topic: Optional[str] = None

class PostCreate(BaseModel):
    source_id: int
    content: str
    author: str
    url: Optional[str] = None

@router.get("/", response_model=List[Post])
async def get_posts(
    source: Optional[str] = Query(None, description="Filter by source name (e.g., twitter, reddit)"),
    sentiment: Optional[str] = Query(None, description="Filter by sentiment label (positive, negative, neutral)"),
    current_user: Dict = Depends(get_current_user_dummy)
):
    filtered_posts = posts_db
    if source:
        source_obj = next((s for s in sources_db if s["name"].lower() == source.lower()), None)
        if source_obj:
            filtered_posts = [p for p in filtered_posts if p["source_id"] == source_obj["id"]]
        else:
            return [] # No posts for unknown source
    if sentiment:
        filtered_posts = [p for p in filtered_posts if p["sentiment_label"].lower() == sentiment.lower()]
    return filtered_posts

@router.post("/", response_model=Post)
async def create_post(post_data: PostCreate, current_user: Dict = Depends(get_current_user_dummy)):
    new_id = max(p["id"] for p in posts_db) + 1 if posts_db else 1
    # Mock sentiment analysis
    sentiment_score, sentiment_label = (0.7, "positive") if "good" in post_data.content.lower() else (-0.5, "negative")

    new_post = {
        "id": new_id,
        "source_id": post_data.source_id,
        "content": post_data.content,
        "author": post_data.author,
        "url": post_data.url,
        "timestamp": datetime.now(),
        "sentiment_score": sentiment_score,
        "sentiment_label": sentiment_label,
        "topic": "General" # Mock topic
    }
    posts_db.append(new_post)
    return new_post