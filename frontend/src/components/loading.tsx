import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-6">
      <div className="flex gap-1 mb-8">
        <div className="w-2 h-12 bg-slate-900 animate-[bounce_1s_infinite_0ms]" />
        <div className="w-2 h-12 bg-slate-900 animate-[bounce_1s_infinite_200ms]" />
        <div className="w-2 h-12 bg-blue-900 animate-[bounce_1s_infinite_400ms]" />
      </div>

      <h2 className="text-3xl font-serif font-black text-slate-900 mb-2 uppercase tracking-widest">
        Memproses
      </h2>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest max-w-xs text-center">
        Algoritma pencocokan sedang menganalisis jawaban.
      </p>
    </div>
  );
};

export default Loading;
