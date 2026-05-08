import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Button from "../components/button";
import GuideCard from "../components/guide-card";
import HeroIllustration from "../components/hero-illustration";
import { Database, Compass, Fingerprint } from "lucide-react";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const hasSavedResult = localStorage.getItem("pilar_latest_result") !== null;

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 border-b-4 border-slate-900 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-3xl z-10">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 block">
                Sistem Rekomendasi Minat & Bakat
              </span>
              <h1 className="text-6xl md:text-8xl font-serif font-black text-slate-900 mb-8 leading-[0.9] tracking-tighter uppercase">
                Temukan Jurusan <br /> Kuliah Idealmu.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 font-serif leading-relaxed mb-12 max-w-xl border-l-4 border-slate-900 pl-6">
                Kenali potensi dirimu melalui metode asesmen RIASEC. Kami bantu memetakan kepribadianmu dan mencocokkannya dengan program studi yang paling relevan.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => navigate("/questions")}>
                  Mulai Tes
                </Button>
                {hasSavedResult && (
                  <Button variant="outline" size="lg" onClick={() => navigate("/result")}>
                    Lihat Hasil Terakhir
                  </Button>
                )}
              </div>
            </div>

            {/* Visual Pendukung (CSS Art / Mockup) */}
            <HeroIllustration />
          </div>
        </section>


        {/* RIASEC Explanation Section */}
        <section className="bg-slate-50 border-b-4 border-slate-900 py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 max-w-3xl">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block">
                Landasan Teori
              </span>
              <h2 className="text-4xl font-serif font-black text-slate-900 uppercase">
                Enam Dimensi Kepribadian
              </h2>
              <p className="text-lg text-slate-600 font-serif leading-relaxed mt-6">
                Holland Codes (RIASEC) membagi kepribadian dan lingkungan kerja manusia ke dalam 6 tipe dasar. Memahami tipe dominanmu adalah kunci menemukan jalur karir yang memuaskan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { type: 'Realistic', code: 'R', desc: 'Praktis, mekanis, dan berorientasi pada tindakan fisik atau kegiatan di luar ruangan.' },
                { type: 'Investigative', code: 'I', desc: 'Analitis, intelektual, dan suka memecahkan masalah kompleks berbasis sains atau logika.' },
                { type: 'Artistic', code: 'A', desc: 'Kreatif, imajinatif, dan lebih suka lingkungan kerja yang tidak terstruktur atau bebas.' },
                { type: 'Social', code: 'S', desc: 'Kooperatif, empatik, dan berdedikasi tinggi untuk membantu, mendidik, atau melayani orang lain.' },
                { type: 'Enterprising', code: 'E', desc: 'Persuasif, ambisius, dan memiliki jiwa kepemimpinan serta ketertarikan pada bisnis.' },
                { type: 'Conventional', code: 'C', desc: 'Terorganisir, teliti, dan andal dalam bekerja dengan data, angka, atau prosedur yang jelas.' },
              ].map((riasec, i) => (
                <div key={i} className="bg-white border-2 border-slate-900 p-6 flex gap-4 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] transition-all duration-300">
                  <div className="w-12 h-12 flex-shrink-0 bg-slate-900 text-white font-serif font-black text-2xl flex items-center justify-center">
                    {riasec.code}
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-black text-slate-900 mb-2 uppercase">{riasec.type}</h3>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">{riasec.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section id="guide" className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-16">
            <h2 className="text-4xl font-serif font-black text-slate-900 uppercase">
              Bagaimana Cara Kerjanya?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GuideCard
              title="Isi Kuesioner"
              icon={<Database size={24} />}
              stepNumber="01"
            >
              Jawab serangkaian pertanyaan singkat yang dirancang untuk menilai tipe kepribadian, minat, dan bakatmu secara akurat.
            </GuideCard>
            <GuideCard
              title="Analisis Profil"
              icon={<Compass size={24} />}
              stepNumber="02"
            >
              Sistem akan memproses jawabanmu menggunakan model RIASEC untuk mengidentifikasi potensi dan kecenderungan minatmu.
            </GuideCard>
            <GuideCard
              title="Dapatkan Rekomendasi"
              icon={<Fingerprint size={24} />}
              stepNumber="03"
            >
              Kamu akan menerima rekomendasi fakultas dan program studi yang memiliki tingkat kecocokan tertinggi dengan kepribadianmu.
            </GuideCard>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-6 py-24 text-center">
          <h2 className="text-5xl font-serif font-black text-slate-900 uppercase mb-8 leading-tight">
            Siap Mengambil Keputusan?
          </h2>
          <p className="text-lg text-slate-600 font-serif mb-12">
            Hanya butuh waktu kurang dari 10 menit untuk mengekstraksi potensi aslimu secara gratis tanpa pungutan biaya.
          </p>
          <Button size="lg" variant="primary" onClick={() => navigate("/questions")} className="px-12 py-6 text-lg">
            Mulai Tes Sekarang
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
