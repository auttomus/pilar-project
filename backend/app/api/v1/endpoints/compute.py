# app/api/v1/endpoints/compute.py
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from sqlalchemy import func
from app.core.database import get_session
from app.schemas.api_schemas import ComputeRequest, ComputeResponse, DecisionRequest
from app.services.processor import calculate_u_vector, get_recommendations
from app.models.riasec import Submission

router = APIRouter()

@router.post("/", response_model=ComputeResponse)
def compute_riasec_result(payload: ComputeRequest, session: Session = Depends(get_session)):
    """
    Menerima jawaban user, menghitung skor, memproses rekomendasi, dan menyimpan submission.
    """
    try:
        # 1. Hitung Vektor U (User)
        u_vector = calculate_u_vector(payload.answers_snapshot, session)
        
        # 2. Ambil Rekomendasi
        recommendations = get_recommendations(u_vector, session, top_n=5)
        
        # 3. Simpan ke database (Tabel submissions)
        new_submission = Submission(
            email=payload.email,
            scores=u_vector,
            answers_snapshot=payload.answers_snapshot
        )
        session.add(new_submission)
        session.commit()
        session.refresh(new_submission)
        
        # 4. Kembalikan response
        return ComputeResponse(
            submission_id=new_submission.id,
            u_scores=u_vector,
            recommendations=recommendations
        )
        
    except Exception as e:
        # Rollback jika ada error saat simpan ke DB untuk mencegah data korup
        session.rollback()
        
        # Catat error ke log server (bisa menggunakan library logging di tahap lanjut)
        print(f"Error during computation: {e}")
        
        # Lemparkan error 500 ke Frontend agar tidak berhenti di status "loading"
        raise HTTPException(
            status_code=500, 
            detail="Terjadi kesalahan pada mesin komputasi. Silakan coba lagi."
        )

@router.patch("/{submission_id}/decision")
def update_decision(submission_id: int, payload: DecisionRequest, session: Session = Depends(get_session)):
    """
    Menyimpan keputusan pengguna apakah akan melanjutkan pendidikan atau tidak.
    Hanya bisa dipanggil sekali per submission.
    """
    submission = session.get(Submission, submission_id)
    if not submission:
        raise HTTPException(status_code=404, detail="Sesi tidak ditemukan.")
    
    if submission.is_continuing is not None:
        raise HTTPException(status_code=400, detail="Keputusan sudah pernah disimpan. Tidak dapat diubah.")
    
    submission.is_continuing = payload.is_continuing
    session.add(submission)
    session.commit()
    return {"status": "success", "message": "Keputusan berhasil disimpan."}

@router.get("/statistics")
def get_statistics(session: Session = Depends(get_session)):
    """
    Mengambil data statistik agregat dari seluruh hasil asesmen.
    """
    # 1. Total partisipan
    total_submissions = session.exec(select(func.count(Submission.id))).one()
    
    # 2. Rasio keputusan
    continuing = session.exec(select(func.count(Submission.id)).where(Submission.is_continuing == True)).one()
    not_continuing = session.exec(select(func.count(Submission.id)).where(Submission.is_continuing == False)).one()
    
    # 3. Tipe kepribadian dominan
    submissions = session.exec(select(Submission.scores)).all()
    dominant_counts = {"R": 0, "I": 0, "A": 0, "S": 0, "E": 0, "C": 0}
    
    for score in submissions:
        if score:
            # Cari nilai tertinggi
            max_val = max(score.values())
            # Hitung SEMUA tipe yang memiliki nilai tertinggi (menangani seri)
            for key, val in score.items():
                if val == max_val:
                    dominant_counts[key] += 1
            
    return {
        "total_participants": total_submissions,
        "decisions": {
            "continuing": continuing,
            "not_continuing": not_continuing,
            "undecided": total_submissions - continuing - not_continuing
        },
        "dominant_types": dominant_counts
    }