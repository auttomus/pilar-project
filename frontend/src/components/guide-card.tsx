import React from "react";

interface GuideCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  stepNumber: string;
}

const GuideCard: React.FC<GuideCardProps> = ({
  title,
  icon,
  children,
  stepNumber,
}) => {
  return (
    <div className="bg-slate-900 text-white p-10 border-l-4 border-blue-600 relative overflow-hidden group">
      <div className="absolute top-6 right-8 text-6xl font-serif font-black text-slate-800 opacity-50 select-none group-hover:scale-110 transition-transform">
        {stepNumber}
      </div>
      <div className="relative z-10">
        <div className="w-12 h-12 bg-white text-slate-900 flex items-center justify-center mb-8">
          {icon}
        </div>
        <h2 className="text-2xl font-serif font-bold mb-4">{title}</h2>
        <div className="space-y-4 text-slate-300 text-sm font-medium leading-relaxed max-w-sm">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GuideCard;
