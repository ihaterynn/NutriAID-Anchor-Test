import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import UploadComponent from '../components/UploadComponent'; // Reusable component
import './AnalysisPage.css'; // Specific styles for AnalysisPage

function AnalysisPage() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const { connected } = useWallet();

  const handleAnalysisComplete = (result) => {
    setAnalysisResult(result);
    console.log("Analysis result:", result);
  };

  console.log("Rendering AnalysisPage");

  if (!connected) {
    return (
      <div className="analysis-page">
        <header>
          <h1>NutriAID: Analyze Food Labels</h1>
        </header>
        <main>
          <p>Please connect your wallet to use this feature.</p>
        </main>
      </div>
    );
  }

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
