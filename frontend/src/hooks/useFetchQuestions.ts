import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../config/api";

export interface QuestionData {
  id: number;
  text_id: string;
}

export const useFetchQuestions = () => {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_ENDPOINTS.QUESTIONS);
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return { questions, loading };
};
