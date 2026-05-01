import React from "react";
import { MapPin, ArrowRight } from "lucide-react";

interface FakultasData {
  fakultas: string;
  recommended_prodis: string[];
  available_prodis: string[];
}

interface ResultCardProps {
  rank: number;
  universitas: string;
  fakultas_list: FakultasData[];
  similarity_score: number;
}

const Result: React.FC<ResultCardProps> = ({
  rank,
  universitas,
  fakultas_list,
  similarity_score,
}) => {
  return (
    <div className="group bg-white border-2 border-slate-200 hover:border-slate-900 transition-all duration-300 p-8 flex flex-col md:flex-row gap-8">
      {/* Metric Block */}
      <div className="flex-shrink-0 flex flex-col items-start md:w-48 border-b md:border-b-0 md:border-r-2 border-slate-100 pb-6 md:pb-0 md:pr-6">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
          Peringkat 0{rank}
        </span>
        <div className="text-5xl font-serif font-black text-slate-900 leading-none mb-2">
          {similarity_score.toFixed(1)}
          <span className="text-2xl text-slate-400">%</span>
        </div>
        <span className="text-xs font-bold text-blue-900 uppercase tracking-widest">
          Indeks Presisi
        </span>
      </div>

      {/* Detail Block */}
      <div className="flex-grow flex flex-col justify-start gap-8">
        <div>
          <h3 className="text-2xl font-serif font-black text-slate-900 flex items-center gap-2">
            <MapPin size={20} className="text-slate-400" />
            {universitas}
          </h3>
        </div>

        <div className="flex flex-col gap-6">
          {fakultas_list.map((fak, idx) => (
            <div key={idx} className="border-l-2 border-slate-100 pl-4 ml-2 hover:border-slate-400 transition-colors">
              <h4 className="text-sm font-bold text-slate-700 uppercase mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                {fak.fakultas}
              </h4>

              <div className="mb-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Program Studi Direkomendasikan
                </p>
                <div className="flex flex-wrap gap-2">
                  {fak.recommended_prodis.map((prodi, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-bold flex items-center gap-2 group-hover:bg-slate-900 group-hover:text-white transition-colors"
                    >
                      <ArrowRight size={12} /> {prodi}
                    </span>
                  ))}
                </div>
              </div>

              {fak.available_prodis.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 mt-1">
                    Program Studi Tersedia
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {fak.available_prodis.map((prodi, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 border border-slate-200 text-slate-500 text-[11px] font-medium flex items-center gap-2 bg-white"
                      >
                        <ArrowRight size={10} /> {prodi}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Result;
