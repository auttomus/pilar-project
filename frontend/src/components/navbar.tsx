import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChartColumnDecreasing } from "lucide-react";
import Button from "./button";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-slate-900 flex items-center justify-center text-white transition-transform group-hover:scale-105">
            <ChartColumnDecreasing size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-serif font-black text-slate-900 tracking-tighter uppercase leading-none">
              PILAR
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 font-bold text-xs text-slate-500 uppercase tracking-widest">
          <Link to="/" className="hover:text-slate-900 transition-colors">
            Beranda
          </Link>
          <Link to="/statistics" className="hover:text-slate-900 transition-colors flex items-center gap-2">
            Statistik
          </Link>
          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate("/questions")}
          >
            Mulai Tes
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-900 p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b-2 border-slate-900 flex flex-col px-6 py-6 gap-6 font-bold text-sm text-slate-500 uppercase tracking-widest shadow-xl">
          <Link
            to="/"
            className="hover:text-slate-900 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Beranda
          </Link>
          <Link
            to="/statistics"
            className="hover:text-slate-900 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Statistik
          </Link>
          <Button
            size="md"
            variant="primary"
            onClick={() => {
              navigate("/questions");
              setIsMenuOpen(false);
            }}
            className="w-full mt-2"
          >
            Mulai Tes
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
