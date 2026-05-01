import React, { useState } from "react";
import Button from "./button";

interface SubmitProps {
  onSubmit: (email: string) => void;
  isLoading?: boolean;
}

const Submit: React.FC<SubmitProps> = ({ onSubmit, isLoading }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onSubmit(email);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white border-2 border-slate-900 p-8 md:p-12">
      <div className="mb-10">
        <h2 className="text-3xl font-serif font-black text-slate-900 mb-4 uppercase tracking-tighter">
          Finalisasi Data
        </h2>
        <div className="w-12 h-1 bg-slate-900 mb-4" />
        <p className="text-sm font-medium text-slate-600 leading-relaxed font-serif italic">
          Seluruh instrumen kognitif telah terjawab. Masukkan kredensial
          institusional Anda untuk melakukan proses enkripsi dan menghasilkan
          postulat kecocokan vokasional.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="relative">
          <label
            htmlFor="email"
            className="block text-[10px] font-bold text-slate-900 uppercase tracking-widest mb-2"
          >
            Alamat Surel Elektronik (Email)
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@institusi.ac.id"
            className="w-full bg-slate-50 border-2 border-slate-200 px-4 py-3 text-slate-900 font-bold placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-slate-900 focus:bg-white transition-colors"
          />
        </div>

        <div className="p-4 bg-slate-100 border-l-4 border-slate-900 text-xs font-medium text-slate-600">
          Dengan menekan tombol di bawah, Anda memvalidasi bahwa data yang
          diberikan adalah representasi mutlak dari preferensi Anda saat ini.
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isLoading}
        >
          Kalkulasi Hasil Asesmen
        </Button>
      </form>
    </div>
  );
};

export default Submit;
