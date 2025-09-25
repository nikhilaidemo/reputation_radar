from fastapi import APIRouter
from typing import  Optional
from app.api.v1 import auth, posts, sources, alerts, playbooks, users

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(posts.router, prefix="/posts", tags=["posts"])
api_router.include_router(sources.router, prefix="/sources", tags=["sources"])
api_router.include_router(alerts.router, prefix="/alerts", tags=["alerts"])
api_router.include_router(playbooks.router, prefix="/playbooks", tags=["playbooks"])
api_router.include_router(users.router, prefix="/users", tags=["users"])