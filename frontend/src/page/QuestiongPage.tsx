import React, { useEffect } from "react";
import { Sparkles, ArrowLeft, ArrowRight } from "lucide-react";
import Question from "../components/question";
import Button from "../components/button";
import Skeleton from "../components/skeleton";
import Submit from "../components/submit";
import Loading from "../components/loading";
import { useQuestions } from "../hooks/useQuestions";

const QuestiongPage: React.FC = () => {
  // Mengambil state dan method dari hook bawaan Anda
  const {
    questions,
    loading,
    computing,
    answers,
    currentPage,
    isSubmitPage,
    questionPages,
    handleValueChange,
    handleSubmit,
    nextPage,
    prevPage,
    totalRemaining,
  } = useQuestions(5);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col pt-24 px-6 items-center">
        <h1 className="text-3xl font-serif font-black mb-8 text-slate-900 uppercase tracking-widest">
          Inisialisasi Instrumen...
        </h1>
        <div className="w-full max-w-4xl">
          <Skeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative">
      {computing && <Loading />}

      {/* Editorial Topbar */}
      <header className="bg-white border-b-2 border-slate-900 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-900 flex items-center justify-center text-white">
              <Sparkles size={14} />
            </div>
            <span className="text-xl font-serif font-black text-slate-900 uppercase">
              PILAR
            </span>
          </div>
          {!isSubmitPage && (
            <div className="text-right flex flex-col">
              <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">
                Segmen {currentPage + 1} dari {questionPages}
              </span>
            </div>
          )}
        </div>
        {!isSubmitPage && (
          <div className="h-1 w-full bg-slate-200">
            <div
              className="h-full bg-slate-900 transition-all duration-300"
              style={{ width: `${((currentPage + 1) / questionPages) * 100}%` }}
            />
          </div>
        )}
      </header>

      <main className="flex-grow max-w-4xl mx-auto w-full px-6 py-12 md:py-20">
        {!isSubmitPage ? (
          <>
            <div className="mb-12 flex justify-between items-end border-b-4 border-slate-900 pb-6">
              <div>
                <h1 className="text-4xl font-serif font-black text-slate-900 uppercase leading-none">
                  Akuisisi <br /> Parameter
                </h1>
              </div>
              <div className="text-right pb-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Sisa Halaman: {totalRemaining}
                </span>
              </div>
            </div>

            <div className="space-y-8">
              {questions.map((q, i) => (
                <Question
                  key={q.id}
                  index={currentPage * 5 + i}
                  text={q.text_id}
                  value={answers[q.id.toString()] ?? 50}
                  onValueChange={(val) => handleValueChange(q.id, val)}
                />
              ))}
            </div>

            <div className="mt-12 pt-8 border-t-2 border-slate-200 flex justify-between items-center">
              <Button
                variant="outline"
                onClick={prevPage}
                disabled={currentPage === 0}
              >
                <ArrowLeft size={16} className="mr-2" />
                Sebelumnya
              </Button>
              <Button variant="primary" onClick={nextPage}>
                Berikutnya
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </>
        ) : (
          <div>
            <Submit onSubmit={handleSubmit} isLoading={computing} />
            <div className="mt-8 text-center">
              <button
                onClick={prevPage}
                className="text-slate-400 hover:text-slate-900 font-bold text-xs transition-colors uppercase tracking-widest flex items-center justify-center mx-auto"
              >
                <ArrowLeft size={14} className="mr-2" />
                Revisi Jawaban Terakhir
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default QuestiongPage;
