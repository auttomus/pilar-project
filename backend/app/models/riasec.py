from typing import List, Optional, Dict, Any
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, JSON

# -----------------
# TABEL CATEGORIES
# -----------------
class Category(SQLModel, table=True):
    __tablename__ = "categories"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    code: str = Field(max_length=1, unique=True)
    name: str = Field(max_length=50)
    description: Optional[str] = None

    # Relasi: Satu Kategori punya Banyak Pertanyaan
    questions: List["Question"] = Relationship(back_populates="category")

# -----------------
# TABEL QUESTIONS
# -----------------
class Question(SQLModel, table=True):
    __tablename__ = "questions"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    category_id: Optional[int] = Field(default=None, foreign_key="categories.id", ondelete="CASCADE")
    text_id: str
    
    # Relasi: Banyak Pertanyaan milik Satu Kategori
    category: Optional[Category] = Relationship(back_populates="questions")

# -----------------
# TABEL SUBMISSIONS
# -----------------
class Submission(SQLModel, table=True):
    __tablename__ = "submissions"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(max_length=255)
    
    # Menggunakan SQLAlchemy Column untuk tipe JSON di MySQL
    scores: Dict[str, Any] = Field(default_factory=dict, sa_column=Column(JSON))
    answers_snapshot: Dict[str, Any] = Field(default_factory=dict, sa_column=Column(JSON))
    
    is_continuing: Optional[bool] = Field(default=None)
    
    # Untuk created_at, kita tangani di level logic atau biarkan database yang isi