// src/config/api.ts
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1",
};

export const API_ENDPOINTS = {
  QUESTIONS: `${API_CONFIG.BASE_URL}/questions/`,
  COMPUTE: `${API_CONFIG.BASE_URL}/compute/`,
  STATISTICS: `${API_CONFIG.BASE_URL}/compute/statistics`,
};
