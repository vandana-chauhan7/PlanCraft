from sqlalchemy.orm import Session
from app.db.models import Planner

def get_public_templates(db: Session):
    return db.query(Planner).filter(Planner.is_template == True).all()

def make_planner_template(db: Session, db_planner: Planner, status: bool):
    db_planner.is_template = status
    db.commit()
    db.refresh(db_planner)
    return db_planner