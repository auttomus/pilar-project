from typing import List, Optional
from sqlmodel import SQLModel, Field, Relationship

# -----------------
# TABEL UNIVERSITAS
# -----------------
class Universitas(SQLModel, table=True):
    __tablename__ = "universitas"
    
    id_univ: Optional[int] = Field(default=None, primary_key=True)
    nama_univ: str = Field(max_length=255)

    # Relasi: Satu Univ punya Banyak Fakultas
    fakultas_list: List["Fakultas"] = Relationship(back_populates="universitas")

# -----------------
# TABEL FAKULTAS
# -----------------
class Fakultas(SQLModel, table=True):
    __tablename__ = "fakultas"
    
    id_fakultas: Optional[int] = Field(default=None, primary_key=True)
    nama_fakultas: str = Field(max_length=100)
    id_univ: Optional[int] = Field(default=None, foreign_key="universitas.id_univ", ondelete="CASCADE")
    


    # Relasi ke Atas (Universitas)
    universitas: Optional[Universitas] = Relationship(back_populates="fakultas_list")
    # Relasi ke Bawah (Prodi)
    prodi_list: List["Prodi"] = Relationship(back_populates="fakultas")

# -----------------
# TABEL PRODI
# -----------------
class Prodi(SQLModel, table=True):
    __tablename__ = "prodi"
    
    id_prodi: Optional[int] = Field(default=None, primary_key=True)
    nama_prodi: str = Field(max_length=100)
    id_fakultas: Optional[int] = Field(default=None, foreign_key="fakultas.id_fakultas", ondelete="CASCADE")

    # Metrik RIASEC
    r_score: Optional[float] = Field(default=None)
    i_score: Optional[float] = Field(default=None)
    a_score: Optional[float] = Field(default=None)
    s_score: Optional[float] = Field(default=None)
    e_score: Optional[float] = Field(default=None)
    c_score: Optional[float] = Field(default=None)

    # Relasi ke Atas (Fakultas)
    fakultas: Optional[Fakultas] = Relationship(back_populates="prodi_list")