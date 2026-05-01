import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { API_ENDPOINTS } from "../config/api";
import { Users, CheckCircle, HelpCircle } from "lucide-react";
import Loading from "../components/loading";

interface StatisticsData {
  total_participants: number;
  decisions: {
    continuing: number;
    not_continuing: number;
    undecided: number;
  };
  dominant_types: Record<string, number>;
}

const riasecNames: Record<string, string> = {
  R: "Realistic",
  I: "Investigative",
  A: "Artistic",
  S: "Social",
  E: "Enterprising",
  C: "Conventional"
};

const StatisticPage: React.FC = () => {
  const [stats, setStats] = useState<StatisticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.STATISTICS);
        if (!response.ok) throw new Error("Gagal mengambil data statistik");
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error(err);
        setError("Tidak dapat memuat data statistik saat ini.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full">
        <header className="mb-16 border-b-4 border-slate-900 pb-8">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4 flex items-center gap-2">
            Telemetri Publik
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-black text-slate-900 uppercase tracking-tighter leading-none">
            Agregat Data.
          </h1>
        </header>

        {error ? (
          <div className="p-8 bg-white border-2 border-slate-900 text-center">
            <h2 className="text-xl font-bold text-slate-900 uppercase mb-2">Error</h2>
            <p className="text-slate-600 font-medium">{error}</p>
          </div>
        ) : stats ? (
          <div className="space-y-12">

            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 text-white p-8">
                <Users size={32} className="mb-6 opacity-80" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Total Partisipan</h3>
                <p className="text-6xl font-serif font-black">{stats.total_participants}</p>
              </div>

              <div className="bg-white border-2 border-slate-900 p-8">
                <CheckCircle size={32} className="mb-6 text-slate-900" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Minat Lanjut Studi</h3>
                <p className="text-6xl font-serif font-black text-slate-900">
                  {stats.total_participants > 0
                    ? Math.round((stats.decisions.continuing / stats.total_participants) * 100)
                    : 0}%
                </p>
                <p className="text-xs font-bold text-slate-400 uppercase mt-2">
                  {stats.decisions.continuing} partisipan
                </p>
              </div>

              <div className="bg-white border-2 border-slate-200 p-8">
                <HelpCircle size={32} className="mb-6 text-slate-400" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Belum Memutuskan / Tidak</h3>
                <p className="text-6xl font-serif font-black text-slate-900">
                  {stats.total_participants > 0
                    ? Math.round(((stats.decisions.not_continuing + stats.decisions.undecided) / stats.total_participants) * 100)
                    : 0}%
                </p>
                <p className="text-xs font-bold text-slate-400 uppercase mt-2">
                  {stats.decisions.not_continuing + stats.decisions.undecided} partisipan
                </p>
              </div>
            </div>

            {/* Dominant Types */}
            <div>
              <div className="mb-8 border-b-2 border-slate-900 pb-4 flex items-center gap-3">
                <h2 className="text-2xl font-serif font-bold text-slate-900 uppercase">
                  Distribusi Kepribadian (Tertinggi)
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {Object.entries(stats.dominant_types).map(([type, count]) => {
                  const percentage = stats.total_participants > 0
                    ? (count / stats.total_participants) * 100
                    : 0;

                  return (
                    <div key={type} className="bg-white p-6 border-2 border-slate-100 hover:border-slate-900 transition-colors group">
                      <div className="flex justify-between items-end mb-8">
                        <span className="text-4xl font-serif font-black text-slate-200 group-hover:text-slate-900 transition-colors">
                          {type}
                        </span>
                        <span className="text-sm font-bold text-slate-900">
                          {Math.round(percentage)}%
                        </span>
                      </div>

                      <div className="h-1 w-full bg-slate-100 mb-4">
                        <div
                          className="h-full bg-slate-900"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>

                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                        {riasecNames[type]}
                      </h4>
                      <p className="text-xs text-slate-400 font-medium">
                        {count} orang
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        ) : null}
      </main>

      <Footer />
    </div>
  );
};

export default StatisticPage;
