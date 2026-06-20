from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class TemplateResponse(BaseModel):
    id: int
    title: str
    layout: List[Dict[str, Any]]
    is_template: bool
    user_id: int

    class Config:
        from_attributes = True