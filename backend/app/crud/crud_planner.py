from sqlalchemy.orm import Session
from app.db.models import Planner
from app.schemas.planner import PlannerCreate, PlannerUpdate

def get_planner(db: Session, planner_id: int, user_id: int):
    return db.query(Planner).filter(Planner.id == planner_id, Planner.user_id == user_id).first()

def get_user_planners(db: Session, user_id: int):
    return db.query(Planner).filter(Planner.user_id == user_id).all()

def create_user_planner(db: Session, planner: PlannerCreate, user_id: int):
    db_planner = Planner(**planner.model_dump(), user_id=user_id)
    db.add(db_planner)
    db.commit()
    db.refresh(db_planner)
    return db_planner

def update_user_planner(db: Session, db_planner: Planner, planner_update: PlannerUpdate):
    update_data = planner_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_planner, key, value)
    db.commit()
    db.refresh(db_planner)
    return db_planner

def delete_user_planner(db: Session, db_planner: Planner):
    db.delete(db_planner)
    db.commit()
    return True