import React, { useState } from 'react';
import { extractText } from '../utils/imageProcessing';
import { analyzeIngredients, checkCalories } from '../utils/textAnalysis';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { analyzeFood } from '../utils/solanaClient';

const UploadComponent = ({ onAnalysisComplete }) => {
  const wallet = useAnchorWallet();
  const [file, setFile] = useState(null);
  const [healthConditions, setHealthConditions] = useState([]);
  const [weightGoal, setWeightGoal] = useState('maintain');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleHealthConditionChange = (e) => {
    const condition = e.target.value;
    setHealthConditions(prev => 
      e.target.checked 
        ? [...prev, condition] 
        : prev.filter(c => c !== condition)
    );
  };

  const handleWeightGoalChange = (e) => {
    setWeightGoal(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !wallet) {
      alert("Please upload a file and connect your wallet.");
      return;
    }

    try {
      const extractedText = await extractText(file);
      const { result, conditionWarnings, potentialHarmWarnings } = analyzeIngredients(extractedText, healthConditions);
      const calorieWarning = checkCalories(extractedText, weightGoal);

      const labeledWarnings = [];
      if (conditionWarnings.includes('sugar')) {
        labeledWarnings.push('Diabetes (sugar)');
      }
      if (conditionWarnings.includes('salt')) {
        labeledWarnings.push('High Blood Pressure (salt)');
      }
      if (calorieWarning) {
        labeledWarnings.push(calorieWarning);
      }

      // Prepare a summary of the analysis to send to Solana
      const analysisSummary = JSON.stringify({
        result: result.substring(0, 100), // Limit the length
        warnings: [...labeledWarnings, ...potentialHarmWarnings].slice(0, 5).join(', ') // Limit the number of warnings
      });

      // Send the summary to the Solana program
      const { data: solanaAnalysis, publicKey: analysisPubkey } = await analyzeFood(analysisSummary);

      onAnalysisComplete({
        recommendation: result,
        concerns: labeledWarnings,
        harmfulIngredients: potentialHarmWarnings,
        solanaAnalysis,
        analysisPubkey: analysisPubkey.toString()
      });
    } catch (error) {
      console.error('Error during analysis:', error);
      alert(`Analysis failed: ${error.message}`);
    }
  };

  return (
    <div className="upload-component">
      <h2 className="upload-title">Upload File</h2>
      <div className="file-input-wrapper">
        <input type="file" onChange={handleFileChange} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="checkbox-group">
          <div className="checkbox-row">
            <label>Diabetes</label>
            <input
              type="checkbox"
              value="diabetes"
              onChange={handleHealthConditionChange}
            />
          </div>
          <div className="checkbox-row">
            <label>High Blood Pressure</label>
            <input
              type="checkbox"
              value="high blood pressure"
              onChange={handleHealthConditionChange}
            />
          </div>
        </div>
        <div className="weight-goal">
          <label>Weight Goal:</label>
          <select value={weightGoal} onChange={handleWeightGoalChange}>
            <option value="maintain">Maintain</option>
            <option value="gain">Gain</option>
            <option value="lose">Lose</option>
          </select>
        </div>
        <button type="submit">Analyze</button>
      </form>
    </div>
  );
};

export default UploadComponent;