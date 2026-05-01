# app/core/database.py
from sqlmodel import create_engine, Session
from app.core.config import settings

# Engine sekarang menggunakan URL dari settings yang berasal dari .env
engine = create_engine(settings.DATABASE_URL, echo=False)

def get_session():
    with Session(engine) as session:
        yield session