from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class PlannerBase(BaseModel):
    title: str
    layout: Optional[List[Dict[str, Any]]] = []
    is_template: Optional[bool] = False

class PlannerCreate(PlannerBase):
    pass

class PlannerUpdate(PlannerBase):
    title: Optional[str] = None

class PlannerResponse(PlannerBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True