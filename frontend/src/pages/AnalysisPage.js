import React, { useState } from 'react';
import UploadComponent from '../components/UploadComponent'; // Reusable component
import './AnalysisPage.css'; // Specific styles for AnalysisPage

function AnalysisPage() {
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalysisComplete = (result) => {
    setAnalysisResult(result);
    console.log("Analysis result:", result);
  };

  console.log("Rendering AnalysisPage");

  return (
    <div className="analysis-page">
      <header>
        <h1>NutriAID: Analyze Food Labels</h1>
      </header>

      <main>
        <UploadComponent onAnalysisComplete={handleAnalysisComplete} />
        {analysisResult && (
          <div className="analysis-result">
            <h2>Analysis Result</h2>
            <p><strong>Recommendation:</strong> {analysisResult.recommendation}</p>
            {analysisResult.concerns.length > 0 && (
              <div className="concerns">
                <h3>Concerns:</h3>
                <ul>
                  {analysisResult.concerns.map((concern, index) => (
                    <li key={index}>{concern}</li>
                  ))}
                </ul>
              </div>
            )}
            {analysisResult.harmfulIngredients.length > 0 && (
              <div className="harmful-ingredients">
                <h3>Potentially Harmful/Unhealthy Ingredients:</h3>
                <ul>
                  {analysisResult.harmfulIngredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default AnalysisPage;
