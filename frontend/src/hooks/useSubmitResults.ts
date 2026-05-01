import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";

export const useSubmitResults = () => {
  const [computing, setComputing] = useState(false);
  const navigate = useNavigate();

  const submitResults = async (email: string, answers: Record<string, number>) => {
    try {
      setComputing(true);
      const response = await fetch(API_ENDPOINTS.COMPUTE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          answers_snapshot: answers,
        }),
      });
      const result = await response.json();

      // result.submission_id now exists
      localStorage.setItem("pilar_latest_result", JSON.stringify(result));
      localStorage.setItem("pilar_submission_id", result.submission_id.toString());
      localStorage.removeItem("pilar_decision_made"); // Reset decision flag for new submission

      setTimeout(() => {
        navigate("/result", { state: { result } });
      }, 1500);
    } catch (error) {
      console.error("Submission failed:", error);
      setComputing(false);
    }
  };

  return { submitResults, computing };
};