import math
from typing import Dict, List, Any
from sqlmodel import Session, select
from app.models.riasec import Question, Category, Submission
from app.models.kampus import Fakultas, Universitas, Prodi

def calculate_u_vector(answers_snapshot: Dict[str, int], session: Session) -> Dict[str, float]:
    """
    Menghitung vektor pengguna U (R, I, A, S, E, C) dalam rentang 0-100.
    """
    # Inisialisasi sum dan count
    scores_sum = {"R": 0.0, "I": 0.0, "A": 0.0, "S": 0.0, "E": 0.0, "C": 0.0}
    scores_count = {"R": 0, "I": 0, "A": 0, "S": 0, "E": 0, "C": 0}
    
    # Ambil semua pertanyaan dari DB untuk mapping ID ke Category Code
    statement = select(Question, Category).join(Category)
    results = session.exec(statement).all()
    
    # Buat map: question_id -> category_code
    q_map = {str(q.id): c.code for q, c in results}
    
    for q_id_str, score in answers_snapshot.items():
        if q_id_str in q_map:
            code = q_map[q_id_str]
            scores_sum[code] += float(score)
            scores_count[code] += 1
            
    # Normalisasi ke skala 0-100
    # U_i = (Total Skor / Skor Maksimal) * 100
    # Karena skor per soal maks 100, maka Skor Maksimal = count * 100. 
    # Sehingga: (Sum / (Count * 100)) * 100 = Sum / Count
    u_vector = {}
    for code in ["R", "I", "A", "S", "E", "C"]:
        if scores_count[code] > 0:
            u_vector[code] = scores_sum[code] / scores_count[code]
        else:
            u_vector[code] = 0.0
            
    return u_vector

def compute_cosine_similarity(u_vec: Dict[str, float], m_vec: Dict[str, float]) -> float:
    """
    Mengkalkulasi Cosine Similarity antara dua vektor.
    """
    dot_product = 0.0
    u_mag_sq = 0.0
    m_mag_sq = 0.0
    
    for code in ["R", "I", "A", "S", "E", "C"]:
        u_val = u_vec.get(code, 0.0)
        m_val = m_vec.get(code, 0.0)
        
        dot_product += (u_val * m_val)
        u_mag_sq += (u_val ** 2)
        m_mag_sq += (m_val ** 2)
        
    if u_mag_sq == 0 or m_mag_sq == 0:
        return 0.0
        
    u_mag = math.sqrt(u_mag_sq)
    m_mag = math.sqrt(m_mag_sq)
    
    similarity = dot_product / (u_mag * m_mag)
    # Kembalikan sebagai persentase 0-100
    return similarity * 100.0

def get_recommendations(u_vector: Dict[str, float], session: Session, top_n: int = 10) -> List[Dict[str, Any]]:
    """
    Mencari kecocokan terbaik antara Vektor Pengguna (U) dan seluruh Program Studi (M),
    kemudian mengelompokkannya berdasarkan Universitas dan Fakultas.
    """
    statement = select(Prodi)
    semua_prodi = session.exec(statement).all()
    
    MAX_M_SCORE = 7.0
    prodi_scores = []
    
    for prodi in semua_prodi:
        m_vector_prime = {
            "R": ((prodi.r_score or 0.0) / MAX_M_SCORE) * 100.0,
            "I": ((prodi.i_score or 0.0) / MAX_M_SCORE) * 100.0,
            "A": ((prodi.a_score or 0.0) / MAX_M_SCORE) * 100.0,
            "S": ((prodi.s_score or 0.0) / MAX_M_SCORE) * 100.0,
            "E": ((prodi.e_score or 0.0) / MAX_M_SCORE) * 100.0,
            "C": ((prodi.c_score or 0.0) / MAX_M_SCORE) * 100.0,
        }
        
        sim_score = compute_cosine_similarity(u_vector, m_vector_prime)
        prodi_scores.append({
            "prodi": prodi,
            "score": sim_score
        })
        
    prodi_scores.sort(key=lambda x: x["score"], reverse=True)
    top_prodis = prodi_scores[:top_n]
    
    grouped = {}
    relevant_fak_ids = set()
    
    for item in top_prodis:
        prodi = item["prodi"]
        score = item["score"]
        
        fakultas = prodi.fakultas
        if not fakultas:
            continue
            
        universitas = fakultas.universitas
        if not universitas:
            continue
            
        univ_id = universitas.id_univ
        fak_id = fakultas.id_fakultas
        relevant_fak_ids.add(fak_id)
        
        if univ_id not in grouped:
            grouped[univ_id] = {
                "universitas": universitas.nama_univ,
                "similarity_score": score, # Diambil dari prodi teratas di universitas ini
                "fakultas_map": {}
            }
            
        if fak_id not in grouped[univ_id]["fakultas_map"]:
            grouped[univ_id]["fakultas_map"][fak_id] = {
                "fakultas": fakultas.nama_fakultas,
                "recommended_prodis": set(),
                "available_prodis": set()
            }
            
        grouped[univ_id]["fakultas_map"][fak_id]["recommended_prodis"].add(prodi.nama_prodi)
        
    if relevant_fak_ids:
        for prodi in semua_prodi:
            if prodi.id_fakultas in relevant_fak_ids:
                fakultas = prodi.fakultas
                if not fakultas or not fakultas.universitas:
                    continue
                univ_id = fakultas.universitas.id_univ
                fak_id = prodi.id_fakultas
                
                if univ_id in grouped and fak_id in grouped[univ_id]["fakultas_map"]:
                    if prodi.nama_prodi not in grouped[univ_id]["fakultas_map"][fak_id]["recommended_prodis"]:
                        grouped[univ_id]["fakultas_map"][fak_id]["available_prodis"].add(prodi.nama_prodi)

    results = []
    for univ_id, univ_data in grouped.items():
        fak_list = []
        for fak_id, fak_data in univ_data["fakultas_map"].items():
            fak_list.append({
                "fakultas": fak_data["fakultas"],
                "recommended_prodis": list(fak_data["recommended_prodis"]),
                "available_prodis": list(fak_data["available_prodis"])
            })
            
        results.append({
            "similarity_score": univ_data["similarity_score"],
            "universitas": univ_data["universitas"],
            "fakultas_list": fak_list
        })
        
    results.sort(key=lambda x: x["similarity_score"], reverse=True)
    return results
