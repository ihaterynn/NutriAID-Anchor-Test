import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';  // Ensure this path is correct
import AnalysisPage from './pages/AnalysisPage';  // Ensure this path is correct

function App() {
  return (
    <Router basename="/NutriAID">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
      </Routes>
    </Router>
  );
}

export default App;
