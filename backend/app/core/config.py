# app/core/config.py
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "PILAR Backend API"
    VERSION: str = "1.0.0"
    
    # Membaca DATABASE_URL dari .env (dikelola sepenuhnya oleh pydantic-settings)
    DATABASE_URL: str
    
    # Membaca list origins untuk CORS dari .env
    # default ke localhost jika .env tidak ditemukan
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:5173"]

    class Config:
        case_sensitive = True
        env_file = ".env" # Memberitahu Pydantic untuk mencari file .env

settings = Settings()