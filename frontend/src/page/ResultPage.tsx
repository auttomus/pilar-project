import React, { useState, useEffect } from "react";
import Stats from "../components/stats";
import Result from "../components/result";
import Button from "../components/button";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useResult } from "../hooks/useResult";
import { API_ENDPOINTS } from "../config/api";

// Tambahkan interface struktural untuk data rekomendasi
interface FakultasData {
  fakultas: string;
  recommended_prodis: string[];
  available_prodis: string[];
}

interface RecommendationData {
  universitas: string;
  similarity_score: number;
  fakultas_list: FakultasData[];
}

const ResultPage: React.FC = () => {
  const { result, u_scores, recommendations, handleBackToHome } = useResult();
  const [decisionMade, setDecisionMade] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if decision was already made for this session
    const decisionFlag = localStorage.getItem("pilar_decision_made");
    if (decisionFlag === "true") {
      setDecisionMade(true);
    }
  }, []);

  const handleDecision = async (isContinuing: boolean) => {
    const submissionId = localStorage.getItem("pilar_submission_id");
    if (!submissionId) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_ENDPOINTS.COMPUTE}${submissionId}/decision`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_continuing: isContinuing }),
      });

      if (response.ok) {
        setDecisionMade(true);
        localStorage.setItem("pilar_decision_made", "true");
      } else {
        const errorData = await response.json();
        alert(`Gagal menyimpan keputusan: ${errorData.detail || 'Terjadi kesalahan'}`);
      }
    } catch (error) {
      console.error("Gagal mengirim keputusan:", error);
      alert("Terjadi kesalahan jaringan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Penanganan jika data kosong / tidak ada sesi
  if (!result) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-3xl font-serif font-black mb-4 text-slate-900 uppercase">
            Anomali Data
          </h2>
          <p className="text-slate-600 font-medium mb-8">
            Sesi asesmen tidak ditemukan atau telah kedaluwarsa.
          </p>
          <Button variant="primary" onClick={handleBackToHome}>
            Kembali ke Indeks
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full">
        <header className="mb-16 border-b-4 border-slate-900 pb-8">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">
            Laporan Analisis Kognitif
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-black text-slate-900 uppercase tracking-tighter leading-none">
            Resolusi Asesmen.
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Visualisasi Matriks */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-slate-900 uppercase">
                Matriks RIASEC
              </h2>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
                Representasi Geometris
              </p>
            </div>
            <Stats scores={u_scores} />
          </div>

          {/* Pemetaan Institusi */}
          <div className="lg:col-span-7 space-y-6">
            <div className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-slate-900 uppercase">
                Korelasi Institusional
              </h2>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
                Algoritma Cosine Similarity
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {recommendations.map((rec: RecommendationData, i: number) => (
                <Result
                  key={i}
                  rank={i + 1}
                  universitas={rec.universitas}
                  fakultas_list={rec.fakultas_list}
                  similarity_score={rec.similarity_score}
                />
              ))}
            </div>

            {/* Area Tindakan & Evaluasi */}
            <div className="mt-20 border-t-4 border-slate-900 pt-12 bg-white p-10">
              <h3 className="text-3xl font-serif font-black text-slate-900 mb-4 uppercase">
                Validasi Output
              </h3>
              <p className="text-slate-600 mb-10 font-medium">
                Keputusan historis ini menjadi variabel penentu untuk optimasi
                mesin rekomendasi PILAR selanjutnya. Apakah hasil kalkulasi ini
                selaras dengan proyeksi Anda?
              </p>

              {!decisionMade ? (
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => handleDecision(true)}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Menyimpan..." : "Tertarik Melanjutkan Pendidikan"}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handleDecision(false)}
                    disabled={isSubmitting}
                  >
                    Belum Tertarik
                  </Button>
                </div>
              ) : (
                <div className="mb-8 p-6 bg-slate-900 text-white text-center font-medium">
                  Terima kasih! Keputusan Anda telah tercatat secara anonim dan akan digunakan untuk optimasi sistem kami.
                </div>
              )}

              <div className="pt-8 border-t border-slate-200">
                <button
                  onClick={handleBackToHome}
                  className="text-slate-400 hover:text-slate-900 font-bold text-xs uppercase tracking-widest transition-colors"
                >
                  [ Inisiasi Ulang Instrumen ]
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResultPage;
