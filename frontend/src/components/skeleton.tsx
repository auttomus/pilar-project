import React from "react";

const Skeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-pulse w-full">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-8 border-2 border-slate-100 bg-slate-50">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-12 h-12 bg-slate-200" />
            <div className="flex-1 space-y-3 pt-2">
              <div className="h-6 w-3/4 bg-slate-200" />
              <div className="h-4 w-1/4 bg-slate-200" />
            </div>
          </div>
          <div className="h-14 w-full bg-slate-200 mt-6" />
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
