import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./page/LandingPage";
import QuestiongPage from "./page/QuestiongPage";
import ResultPage from "./page/ResultPage";
import StatisticPage from "./page/StatisticPage";
import DocumentPage from "./page/DocumentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/questions" element={<QuestiongPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/statistics" element={<StatisticPage />} />
        <Route path="/document" element={<DocumentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
