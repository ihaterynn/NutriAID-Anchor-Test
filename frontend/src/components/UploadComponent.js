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
    setHealthConditions((prev) =>
      e.target.checked
        ? [...prev, condition]
        : prev.filter((c) => c !== condition)
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
      const { result, conditionWarnings, potentialHarmWarnings } =
        analyzeIngredients(text, healthConditions);
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
    <div className="upload-component">
      {/* Center the Upload File header */}
      <h2 className="upload-title">Upload File</h2>

      {/* Move the file input outside of the form */}
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
