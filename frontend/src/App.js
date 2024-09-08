import React, { useState } from 'react';
import UploadComponent from './components/UploadComponent';

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalysisComplete = (result) => {
    setAnalysisResult(result);
  };

  return (
    <div className="App">
      <h1>NutriAID: Analyze Food Labels</h1>
      <UploadComponent onAnalysisComplete={handleAnalysisComplete} />
      {analysisResult && (
        <div>
          <h2>Analysis Result</h2>
          <p>Recommendation: {analysisResult.recommendation}</p>
          {analysisResult.concerns.length > 0 && (
            <div>
              <h3>Concerns:</h3>
              <ul>
                {analysisResult.concerns.map((concern, index) => (
                  <li key={index}>{concern}</li>
                ))}
              </ul>
            </div>
          )}
          {analysisResult.harmfulIngredients.length > 0 && (
            <div>
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
    </div>
  );
}

export default App;