import React, { useState, useEffect } from 'react';
import { extractText } from '../utils/imageProcessing';
import { analyzeIngredients, checkCalories } from '../utils/textAnalysis';
import { useAnchorWallet, useWallet, useConnection } from '@solana/wallet-adapter-react';
import { analyzeFood } from '../utils/solanaClient';

const UploadComponent = ({ onAnalysisComplete }) => {
  const anchorWallet = useAnchorWallet();
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [file, setFile] = useState(null);
  const [healthConditions, setHealthConditions] = useState([]);
  const [weightGoal, setWeightGoal] = useState('maintain');

  useEffect(() => {
    console.log("Wallet connection status:", connected);
    console.log("Public key:", publicKey?.toString());
  }, [connected, publicKey]);

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
    if (!file || !connected || !publicKey || !anchorWallet) {
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

      const analysisSummary = JSON.stringify({
        result: result.substring(0, 100),
        warnings: [...labeledWarnings, ...potentialHarmWarnings].slice(0, 5).join(', ')
      });

      const { data: solanaAnalysis, publicKey: analysisPubkey } = await analyzeFood(analysisSummary, anchorWallet, connection);

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