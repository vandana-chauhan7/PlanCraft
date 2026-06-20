from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import engine, Base
from app.api.routes import auth, planners, templates, users
from app.core.config import settings

# Automatically synchronize schema structural changes for local development environment
# Note: For production architectures, database migrations should be managed via Alembic
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    description="Production-ready core API workspace for PlanCraft workflow builders"
)

# Configure Cross-Origin Resource Sharing (CORS) rules for React frontend framework integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",      # Vite development server default address
        "http://127.0.0.1:5173",      # Localhost IP address variant
    ],
    allow_credentials=True,
    allow_methods=["*"],                      # Restful Verbs (GET, POST, PUT, DELETE, OPTIONS)
    allow_headers=["*"],
)

# Route Registry Integrations
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(planners.router, prefix="/api/planners", tags=["Workspace Management"])
app.include_router(templates.router, prefix="/api/templates", tags=["Template Marketplace"])
app.include_router(users.router, prefix="/api/users", tags=["User Profiles"])

@app.get("/", tags=["Health"])
def health_check():
    """System heartbeat verification utility endpoint."""
    return {
        "status": "operational",
        "service": settings.PROJECT_NAME,
        "environment": "development"
    }