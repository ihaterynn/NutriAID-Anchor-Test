import React, { useState } from 'react';
import { extractText } from '../utils/imageProcessing';
import { analyzeIngredients, checkCalories } from '../utils/textAnalysis';

const UploadComponent = ({ onAnalysisComplete }) => {
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
    if (!file) return;

    try {
      const text = await extractText(file);
      const { result, conditionWarnings, potentialHarmWarnings } = analyzeIngredients(text, healthConditions);
      const calorieWarning = checkCalories(text, weightGoal);

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

      onAnalysisComplete({
        recommendation: result,
        concerns: labeledWarnings,
        harmfulIngredients: potentialHarmWarnings,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Upload File</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <div>
          <label>
            <input
              type="checkbox"
              value="diabetes"
              onChange={handleHealthConditionChange}
            />
            Diabetes
          </label>
          <label>
            <input
              type="checkbox"
              value="high blood pressure"
              onChange={handleHealthConditionChange}
            />
            High Blood Pressure
          </label>
        </div>
        <div>
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
