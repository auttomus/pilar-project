import React from "react";
import { Globe, Mail, MessageCircle, ChartColumnDecreasing } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-100 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          {/* Logo & Desc */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <div className="w-8 h-8 bg-slate-900 flex items-center justify-center text-white shadow-md shadow-indigo-100">
                <ChartColumnDecreasing size={16} />
              </div>
              <span className="text-lg font-black text-slate-900 tracking-tighter uppercase">
                PILAR
              </span>
            </div>
            <p className="text-slate-400 text-sm font-medium max-w-xs">
              Membantumu menemukan masa depan yang lebih baik melalui analisis
              minat dan bakat berbasis data.
            </p>
          </div>

          {/* Socials */}
          <div className="flex gap-4">
            <a
              href="#"
              className="w-12 h-12 bg-white flex items-center justify-center text-slate-400 hover:text-slate-900 hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-100"
            >
              <Globe size={20} />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-white flex items-center justify-center text-slate-400 hover:text-slate-900 hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-100"
            >
              <Mail size={20} />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-white flex items-center justify-center text-slate-400 hover:text-slate-900 hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-100"
            >
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-200/50 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
          <p>&copy; 2026 PILAR System. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-600">
              Kebijakan Privasi
            </a>
            <a href="#" className="hover:text-slate-600">
              Syarat & Ketentuan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
