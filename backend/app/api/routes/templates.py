from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.models import Planner, User
from app.schemas.template import TemplateResponse
from app.schemas.planner import PlannerResponse
from app.api.dependencies import get_db, get_current_user
from app.crud import crud_template, crud_planner

router = APIRouter()

@router.get("/marketplace", response_model=List[TemplateResponse])
def browse_marketplace(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Fetch all publicly shared layouts from the community."""
    return crud_template.get_public_templates(db)

@router.post("/{planner_id}/publish", response_model=PlannerResponse)
def publish_to_marketplace(planner_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Publish an existing workspace layout to the marketplace."""
    planner = crud_planner.get_planner(db, planner_id=planner_id, user_id=current_user.id)
    if not planner:
        raise HTTPException(status_code=404, detail="Planner workspace not found")
    return crud_template.make_planner_template(db, db_planner=planner, status=True)

@router.post("/{template_id}/duplicate", response_model=PlannerResponse)
def duplicate_template(template_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Clone a public template and save it to the user's dashboard."""
    template = db.query(Planner).filter(Planner.id == template_id, Planner.is_template == True).first()
    if not template:
        raise HTTPException(status_code=404, detail="Public template not found")
        
    # Create an identical clone assigned to the active user session
    duplicated_data = {
        "title": f"Copy of {template.title}",
        "layout": template.layout,
        "is_template": False
    }
    
    new_planner = Planner(**duplicated_data, user_id=current_user.id)
    db.add(new_planner)
    db.commit()
    db.refresh(new_planner)
    return new_planner