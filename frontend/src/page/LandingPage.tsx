import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Button from "../components/button";
import GuideCard from "../components/guide-card";
import { Database, Compass, Fingerprint } from "lucide-react";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const hasSavedResult = localStorage.getItem("pilar_latest_result") !== null;

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 border-b-4 border-slate-900">
          <div className="max-w-4xl">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 block">
              Protokol Analisis Minat & Bakat
            </span>
            <h1 className="text-6xl md:text-8xl font-serif font-black text-slate-900 mb-8 leading-[0.9] tracking-tighter uppercase">
              Presisi Dalam <br /> Pemetaan Karir.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-serif leading-relaxed mb-12 max-w-2xl border-l-4 border-slate-900 pl-6">
              Menggunakan pemodelan vektor RIASEC untuk mengekstraksi
              kecenderungan empiris Anda. Pendekatan analitik untuk
              mengeliminasi bias subjektif dalam penentuan lintasan akademik.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => navigate("/questions")}>
                Mulai Tes
              </Button>
              <Button variant="outline" size="lg">
                Tinjau Metodologi
              </Button>
              {hasSavedResult && (
                <Button variant="outline" size="lg" onClick={() => navigate("/result")}>
                  Lihat Hasil Terakhir
                </Button>
              )}
            </div>
          </div>
        </section>



        {/* Methodology Section */}
        <section id="guide" className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-16">
            <h2 className="text-4xl font-serif font-black text-slate-900 uppercase">
              Protokol Sistem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GuideCard
              title="Akuisisi Data"
              icon={<Database size={24} />}
              stepNumber="01"
            >
              Validasi 100 variabel kuesioner menggunakan parameter presisi
              (skala 0-100) untuk memetakan kepribadian.
            </GuideCard>
            <GuideCard
              title="Pemrosesan Vektor"
              icon={<Compass size={24} />}
              stepNumber="02"
            >
              Algoritma mengeksekusi perhitungan persilangan untuk membandingkan
              matriks profil Anda dengan basis data institusi.
            </GuideCard>
            <GuideCard
              title="Keluaran Definitif"
              icon={<Fingerprint size={24} />}
              stepNumber="03"
            >
              Hasil disajikan dengan persentase kecocokan absolut, merujuk
              langsung pada fakultas dan program studi terkait.
            </GuideCard>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
