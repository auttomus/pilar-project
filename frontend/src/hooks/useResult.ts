// src/hooks/useResult.ts
import { useLocation, useNavigate } from "react-router-dom";

export const useResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Ambil dari state navigasi router
  let result = location.state?.result;

  if (!result) {
    const savedResult = localStorage.getItem("pilar_latest_result");
    if (savedResult) {
      try {
        result = JSON.parse(savedResult);
      } catch (e) {
        console.error("Gagal parsing data tersimpan", e);
      }
    }
  }

  const handleBackToHome = () => navigate("/");

  return {
    result,
    u_scores: result?.u_scores,
    recommendations: result?.recommendations,
    handleBackToHome,
  };
};