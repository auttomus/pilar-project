from fastapi import APIRouter
from app.api.v1.endpoints import questions, compute

api_router = APIRouter()

api_router.include_router(questions.router, prefix="/questions", tags=["questions"])
api_router.include_router(compute.router, prefix="/compute", tags=["compute"])
