from pydantic import BaseModel, EmailStr
from typing import Dict, List, Any

# --------------------------------
# Request Schemas
# --------------------------------
class ComputeRequest(BaseModel):
    email: EmailStr
    # answers_snapshot berisi pasangan "question_id": "score"
    # misal: {"1": 75, "2": 50, ...}
    answers_snapshot: Dict[str, int]

# --------------------------------
# Response Schemas
# --------------------------------
class QuestionOut(BaseModel):
    id: int
    text_id: str
    category_id: int

class UVectorScore(BaseModel):
    R: float
    I: float
    A: float
    S: float
    E: float
    C: float

class FakultasDetail(BaseModel):
    fakultas: str
    recommended_prodis: List[str]
    available_prodis: List[str]

class RecommendationResult(BaseModel):
    similarity_score: float
    universitas: str
    fakultas_list: List[FakultasDetail]

class ComputeResponse(BaseModel):
    submission_id: int
    u_scores: UVectorScore
    recommendations: List[RecommendationResult]

class DecisionRequest(BaseModel):
    is_continuing: bool

