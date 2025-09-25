from fastapi import APIRouter, HTTPException, status, Depends, Query
from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import datetime
from app.core.dummy_db import alerts_db, posts_db
from app.api.v1.auth import get_current_user_dummy

router = APIRouter()

class Alert(BaseModel):
    id: int
    post_id: int
    alert_type: str
    severity: str
    created_at: datetime
    resolved: bool

class AlertResolve(BaseModel):
    resolved: bool

@router.get("/", response_model=List[Alert])
async def get_alerts(
    resolved: Optional[bool] = Query(None, description="Filter by resolved status"),
    current_user: Dict = Depends(get_current_user_dummy)
):
    filtered_alerts = alerts_db
    if resolved is not None:
        filtered_alerts = [a for a in filtered_alerts if a["resolved"] == resolved]
    return filtered_alerts

@router.post("/{alert_id}/resolve", response_model=Alert)
async def resolve_alert(
    alert_id: int,
    resolve_data: AlertResolve,
    current_user: Dict = Depends(get_current_user_dummy)
):
    alert = next((a for a in alerts_db if a["id"] == alert_id), None)
    if not alert:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Alert not found")
    alert["resolved"] = resolve_data.resolved
    return alert