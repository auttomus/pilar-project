import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./page/LandingPage";
import QuestiongPage from "./page/QuestiongPage";
import ResultPage from "./page/ResultPage";
import StatisticPage from "./page/StatisticPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/questions" element={<QuestiongPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/statistics" element={<StatisticPage />} />
      </Routes>
    </Router>
  );
}

export default App;
