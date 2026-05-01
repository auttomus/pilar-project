import React from "react";
import Slider from "./slider";

interface QuestionProps {
  text: string;
  value: number;
  onValueChange: (value: number) => void;
  index: number;
}

const Question: React.FC<QuestionProps> = ({
  text,
  value,
  onValueChange,
  index,
}) => {
  return (
    <div className="p-8 md:p-12 bg-white border-2 border-slate-100 hover:border-slate-900 transition-colors mb-8 relative">
      <div className="absolute top-0 left-0 w-12 h-12 bg-slate-900 flex items-center justify-center text-white font-bold text-sm">
        {index + 1 < 10 ? `0${index + 1}` : index + 1}
      </div>

      <div className="ml-8 md:ml-12 mb-10">
        <h3 className="text-2xl md:text-3xl font-serif font-medium text-slate-900 leading-snug mb-4">
          "{text}"
        </h3>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Skala: 0 (Mutlak Tidak) — 100 (Mutlak Ya)
        </p>
      </div>

      <div className="px-2 md:px-12">
        <Slider value={value} onChange={onValueChange} />
      </div>
    </div>
  );
};

export default Question;
