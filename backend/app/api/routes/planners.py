from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.models import Planner, User
from app.schemas.planner import PlannerCreate, PlannerUpdate, PlannerResponse
from app.api.dependencies import get_db, get_current_user

router = APIRouter()

@router.post("/", response_model=PlannerResponse)
def create_planner(planner: PlannerCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_planner = Planner(**planner.model_dump(), user_id=current_user.id)
    db.add(new_planner)
    db.commit()
    db.refresh(new_planner)
    return new_planner

@router.get("/", response_model=List[PlannerResponse])
def get_user_planners(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Planner).filter(Planner.user_id == current_user.id).all()

@router.get("/{planner_id}", response_model=PlannerResponse)
def get_planner(planner_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    planner = db.query(Planner).filter(Planner.id == planner_id, Planner.user_id == current_user.id).first()
    if not planner:
        raise HTTPException(status_code=404, detail="Planner not found")
    return planner

@router.put("/{planner_id}", response_model=PlannerResponse)
def update_planner(planner_id: int, planner_update: PlannerUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_planner = db.query(Planner).filter(Planner.id == planner_id, Planner.user_id == current_user.id).first()
    if not db_planner:
        raise HTTPException(status_code=404, detail="Planner not found")
    
    update_data = planner_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_planner, key, value)
        
    db.commit()
    db.refresh(db_planner)
    return db_planner

@router.delete("/{planner_id}")
def delete_planner(planner_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_planner = db.query(Planner).filter(Planner.id == planner_id, Planner.user_id == current_user.id).first()
    if not db_planner:
        raise HTTPException(status_code=404, detail="Planner not found")
    
    db.delete(db_planner)
    db.commit()
    return {"message": "Planner deleted successfully"}