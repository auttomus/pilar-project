import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Button from "../components/button";
import { FileText, Download, ExternalLink, GraduationCap } from "lucide-react";

const DocumentPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Navbar />

      <main className="flex-grow">
        {/* Header Section */}
        <section className="bg-slate-50 border-b-4 border-slate-900 py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em]">
                Academic Resources
              </span>
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                Last Updated: May 2026
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-black text-slate-900 mb-8 leading-[0.95] uppercase tracking-tighter">
              Dokumentasi <br /> & Paper Publikasi.
            </h1>
            
            <p className="text-xl text-slate-600 font-serif leading-relaxed border-l-4 border-slate-900 pl-8 py-2">
              Pelajari metodologi di balik sistem PILAR, landasan teori Holland Codes (RIASEC), dan bagaimana algoritma rekomendasi kami membantu memetakan jalur akademik mahasiswa.
            </p>
          </div>
        </section>

        {/* Paper Section */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            
            {/* Sidebar Meta */}
            <div className="md:col-span-4 space-y-10">
              <div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                  Penulis Utama
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                    <GraduationCap size={20} className="text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900 leading-none">Tim Pengembang PILAR</p>
                    <p className="text-[11px] text-slate-500 font-bold uppercase mt-1 tracking-wider">Research & Dev</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                  Topik Penelitian
                </h3>
                <ul className="space-y-3">
                  {["Decision Support System", "Psychometric Mapping", "RIASEC Algorithm", "Educational Tech"].map((tag, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <div className="w-1.5 h-1.5 bg-slate-900" />
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 bg-slate-900 text-white space-y-4">
                <h4 className="text-lg font-serif font-black uppercase">Unduh Salinan</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  Dapatkan versi PDF lengkap untuk keperluan referensi akademik atau tinjauan metodologi.
                </p>
                <a 
                  href="/paper.pdf" 
                  download 
                  className="inline-flex items-center justify-center w-full bg-white text-slate-900 py-3 font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-colors gap-2"
                >
                  <Download size={14} />
                  Download PDF
                </a>
              </div>
            </div>

            {/* Content area */}
            <div className="md:col-span-8">
              <div className="bg-white border-4 border-slate-900 p-8 shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] mb-12">
                <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-slate-100">
                  <div className="flex items-center gap-3 text-slate-400">
                    <FileText size={32} />
                    <div>
                      <h2 className="text-xl font-serif font-black text-slate-900 uppercase">Abstract</h2>
                      <p className="text-[10px] font-bold uppercase tracking-widest">Technical Paper v1.0</p>
                    </div>
                  </div>
                  <a href="/paper.pdf" target="_blank" className="p-2 border-2 border-slate-200 hover:border-slate-900 transition-colors">
                    <ExternalLink size={18} />
                  </a>
                </div>

                <div className="prose prose-slate max-w-none">
                  <p className="text-lg text-slate-800 font-serif leading-relaxed italic mb-8">
                    "Penelitian ini mengeksplorasi efektivitas penggunaan algoritma Cosine Similarity dalam memetakan profil psikometrik mahasiswa berdasarkan tes RIASEC. Sistem PILAR bertujuan untuk meminimalkan tingkat ketidaksesuaian pemilihan jurusan melalui analisis komputasi yang presisi."
                  </p>
                  
                  <h3 className="text-xl font-serif font-black text-slate-900 uppercase mt-12 mb-4">Metodologi</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    Sistem ini mengadopsi pendekatan kuantitatif dengan membandingkan vektor jawaban pengguna terhadap bobot referensi yang telah divalidasi oleh pakar pendidikan.
                  </p>

                  <h3 className="text-xl font-serif font-black text-slate-900 uppercase mt-8 mb-4">Tumpukan Teknologi</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Dibangun menggunakan arsitektur modern (FastAPI & React) untuk menjamin skalabilitas dan responsivitas data secara real-time.
                  </p>
                </div>

                <div className="mt-12">
                   <Button 
                    variant="primary" 
                    className="w-full py-6 flex items-center justify-center gap-3"
                    onClick={() => window.open('/paper.pdf', '_blank')}
                   >
                     <FileText size={20} />
                     Baca Paper Lengkap
                   </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DocumentPage;
