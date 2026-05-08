import React from "react";
import { Compass, Fingerprint } from "lucide-react";

const HeroIllustration: React.FC = () => {
  return (
    <div className="hidden lg:flex relative h-[520px] w-full justify-center items-center">
      {/* Background decorative elements */}
      <div className="absolute w-[80%] h-[80%] bg-slate-50 border-4 border-slate-200 transform rotate-6 rounded-xl" />
      <div className="absolute w-[80%] h-[80%] bg-slate-100 border-4 border-slate-300 transform -rotate-3 rounded-xl" />
      
      {/* Main abstract card */}
      <div className="absolute w-[75%] bg-white border-4 border-slate-900 p-8 shadow-[16px_16px_0px_0px_rgba(15,23,42,1)] z-20 flex flex-col gap-6 hover:-translate-y-2 hover:shadow-[20px_20px_0px_0px_rgba(15,23,42,1)] transition-all duration-300">
        <div className="flex justify-between items-center border-b-2 border-slate-100 pb-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-200" />
            <div className="w-3 h-3 rounded-full bg-slate-300" />
            <div className="w-3 h-3 rounded-full bg-slate-900" />
          </div>
          <Compass size={20} className="text-slate-400" />
        </div>
        
        <div className="space-y-3">
          {[
            { label: 'R', val: 85 },
            { label: 'I', val: 70 },
            { label: 'A', val: 55 },
            { label: 'S', val: 40 },
            { label: 'E', val: 25 },
            { label: 'C', val: 15 }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-8 h-8 flex-shrink-0 bg-slate-100 border-2 border-slate-200 flex items-center justify-center font-bold text-xs text-slate-500">
                {item.label}
              </div>
              <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-slate-900" 
                  style={{ width: `${item.val}%` }} 
                />
              </div>
              <span className="text-xs font-bold w-8 text-right text-slate-900">{item.val}%</span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-slate-900 text-white flex justify-between items-center group cursor-pointer">
          <span className="text-xs font-bold tracking-widest uppercase">Lihat Kecocokan</span>
          <Fingerprint size={16} className="group-hover:scale-110 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default HeroIllustration;
