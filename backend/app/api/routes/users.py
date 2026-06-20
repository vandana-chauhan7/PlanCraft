from fastapi import APIRouter, Depends
from app.schemas.user import UserResponse
from app.db.models import User
from app.api.dependencies import get_current_user

router = APIRouter()

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    """Quick validation check to confirm client JWT profile is valid."""
    return current_user