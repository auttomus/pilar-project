import React from "react";

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
}) => {
  const markers = [0, 25, 50, 75, 100];

  return (
    <div className="w-full py-6 relative">
      <div className="flex justify-between items-end mb-4">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Intensitas
        </span>
        <span className="text-2xl font-serif font-black text-slate-900">
          {value}
        </span>
      </div>

      <div className="relative h-14 flex items-center">
        {/* Track Line */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-200 -translate-y-1/2">
          <div
            className="h-full bg-slate-900"
            style={{ width: `${((value - min) / (max - min)) * 100}%` }}
          />
        </div>

        {/* Structural Ticks */}
        <div className="absolute top-1/2 left-0 w-full flex justify-between -translate-y-1/2 pointer-events-none px-[2px]">
          {markers.map((m) => (
            <div
              key={m}
              className="flex flex-col items-center gap-2 -translate-y-4"
            >
              <span
                className={`text-[10px] font-bold ${value >= m ? "text-slate-900" : "text-slate-400"}`}
              >
                {m}
              </span>
              <div
                className={`w-[2px] h-3 ${value >= m ? "bg-slate-900" : "bg-slate-300"}`}
              />
            </div>
          ))}
        </div>

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
        />

        {/* Solid Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none z-10"
          style={{ left: `${((value - min) / (max - min)) * 100}%` }}
        >
          <div className="w-5 h-8 bg-slate-900 shadow-md transform transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default Slider;
