import random
from typing import List
from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from app.core.database import get_session
from app.models.riasec import Question
from app.schemas.api_schemas import QuestionOut

router = APIRouter()

@router.get("/", response_model=List[QuestionOut])
def get_randomized_questions(session: Session = Depends(get_session)):
    """
    Mengambil semua pertanyaan dari database dan mengacak urutannya.
    """
    statement = select(Question)
    questions = session.exec(statement).all()
    
    # Acak urutan pertanyaan
    random.shuffle(questions)
    
    return questions
