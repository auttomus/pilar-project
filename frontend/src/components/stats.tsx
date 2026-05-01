import React from "react";

interface StatsProps {
  scores: { R: number; I: number; A: number; S: number; E: number; C: number };
}

// Mengekstrak kunci spesifik dari StatsProps['scores']
type CategoryKey = keyof StatsProps["scores"];

const Stats: React.FC<StatsProps> = ({ scores }) => {
  const size = 320;
  const center = size / 2;
  const maxRadius = size * 0.35;

  // Mengamankan tipe objek array menggunakan CategoryKey
  const categories: { key: CategoryKey; label: string }[] = [
    { key: "R", label: "Realistic" },
    { key: "I", label: "Investigative" },
    { key: "A", label: "Artistic" },
    { key: "S", label: "Social" },
    { key: "E", label: "Enterprising" },
    { key: "C", label: "Conventional" },
  ];

  const getCoords = (index: number, score: number) => {
    const angle = (index * 60 - 90) * (Math.PI / 180);
    const radius = (score / 100) * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  const polygonPoints = categories
    .map((cat, i) => {
      // Tidak perlu lagi memakai "as any"
      const coords = getCoords(i, scores[cat.key]);
      return `${coords.x},${coords.y}`;
    })
    .join(" ");

  return (
    <div className="flex flex-col items-center bg-slate-50 p-8 border-2 border-slate-100">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {[20, 40, 60, 80, 100].map((level) => (
          <polygon
            key={level}
            points={categories
              .map(
                (_, i) => `${getCoords(i, level).x},${getCoords(i, level).y}`,
              )
              .join(" ")}
            className="fill-none stroke-slate-300 stroke-[1px]"
          />
        ))}
        {categories.map((_, i) => (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={getCoords(i, 100).x}
            y2={getCoords(i, 100).y}
            className="stroke-slate-300 stroke-[1px] stroke-dasharray-4"
          />
        ))}

        {/* Data Shape */}
        <polygon
          points={polygonPoints}
          className="fill-slate-900/10 stroke-slate-900 stroke-[3px]"
        />

        {categories.map((cat, i) => (
          <circle
            key={i}
            cx={getCoords(i, scores[cat.key]).x}
            cy={getCoords(i, scores[cat.key]).y}
            r="4"
            className="fill-slate-900"
          />
        ))}

        {categories.map((cat, i) => {
          const coords = getCoords(i, 130);
          return (
            <text
              key={i}
              x={coords.x}
              y={coords.y}
              textAnchor="middle"
              alignmentBaseline="middle"
              className="text-[10px] font-bold fill-slate-900 uppercase tracking-widest"
            >
              {cat.label}
            </text>
          );
        })}
      </svg>

      <div className="grid grid-cols-3 w-full border-t-2 border-slate-200 mt-6 pt-6">
        {categories.map((cat, idx) => (
          <div
            key={cat.key}
            className={`p-4 flex flex-col items-center ${idx !== 2 && idx !== 5 ? "border-r border-slate-200" : ""}`}
          >
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              {cat.label}
            </span>
            <span className="text-xl font-serif font-black text-slate-900">
              {scores[cat.key].toFixed(0)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
