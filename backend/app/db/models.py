from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship
from app.db.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    planners = relationship("Planner", back_populates="owner")

class Planner(Base):
    __tablename__ = "planners"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    layout = Column(JSONB, default=list) # Stores the drag-and-drop block data
    is_template = Column(Boolean, default=False)
    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="planners")