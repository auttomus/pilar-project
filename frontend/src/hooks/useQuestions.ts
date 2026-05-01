import { useState, useEffect } from "react";
import { useFetchQuestions, type QuestionData } from "./useFetchQuestions";
import { useSubmitResults } from "./useSubmitResults";

export const useQuestions = (itemsPerPage: number = 3) => {
  const { questions, loading } = useFetchQuestions();
  const { submitResults, computing } = useSubmitResults();
  
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentPage, setCurrentPage] = useState(0);

  // Sync initial answers when questions are loaded
  useEffect(() => {
    if (questions.length > 0) {
      const initialAnswers: Record<string, number> = {};
      questions.forEach((q: QuestionData) => {
        initialAnswers[q.id.toString()] = 50;
      });
      setAnswers(initialAnswers);
    }
  }, [questions]);

  const handleValueChange = (id: number, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [id.toString()]: value,
    }));
  };

  const questionPages = Math.ceil(questions.length / itemsPerPage);
  // Total pages = question pages + 1 submit page
  const totalPages = questionPages + 1;
  const isSubmitPage = currentPage === questionPages;
  const currentQuestions = isSubmitPage
    ? []
    : questions.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
      );

  const isLastPage = isSubmitPage;

  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages - 1));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 0));

  const handleSubmit = (email: string) => submitResults(email, answers);

  return {
    questions: currentQuestions,
    loading,
    computing,
    answers,
    currentPage,
    totalPages,
    isLastPage,
    isSubmitPage,
    questionPages,
    handleValueChange,
    handleSubmit,
    nextPage,
    prevPage,
    totalRemaining: Math.max(0, questionPages - (currentPage + 1)),
  };
};
