import harmfulIngredients from '../data/harmful_ingredients.json';

export const analyzeIngredients = (text, healthConditions) => {
  const warnings = [];
  const potentialHarmWarnings = [];

  healthConditions.forEach(condition => {
    const harmfulForCondition = harmfulIngredients.filter(item => item.harmful_for === condition);
    harmfulForCondition.forEach(item => {
      if (text.toLowerCase().includes(item.ingredient.toLowerCase())) {
        warnings.push(item.ingredient);
      }
    });
  });

  const sodiumMatch = text.match(/sodium\s*(\d+)\s*mg/i);
  const cholesterolMatch = text.match(/cholesterol\s*(\d+)\s*mg/i);

  if (sodiumMatch && parseInt(sodiumMatch[1]) > 800) {
    warnings.push('sodium');
  }

  if (cholesterolMatch && parseInt(cholesterolMatch[1]) > 80) {
    warnings.push('cholesterol');
  }

  if (warnings.includes('sodium') || warnings.includes('cholesterol')) {
    if (text.toLowerCase().includes('fat') || text.toLowerCase().includes('fats')) {
      warnings.push('fats');
    }
  }

  const generalHarmful = harmfulIngredients.filter(item => item.harmful_for === 'all');
  generalHarmful.forEach(item => {
    if (text.toLowerCase().includes(item.ingredient.toLowerCase())) {
      potentialHarmWarnings.push(item.ingredient);
    }
  });

  return {
    result: warnings.length > 0 || potentialHarmWarnings.length > 0 ? "No" : "Yes",
    conditionWarnings: [...new Set(warnings)],
    potentialHarmWarnings: [...new Set(potentialHarmWarnings)]
  };
};

export const checkCalories = (text, weightGoal) => {
  const calorieMatch = text.match(/calories\s*(\d+)/i);
  if (calorieMatch) {
    const calories = parseInt(calorieMatch[1], 10);
    if (calories > 200 && (weightGoal === 'maintain' || weightGoal === 'lose')) {
      return 'High Calorie';
    } else if (calories <= 200 && weightGoal === 'gain') {
      return 'Low Calorie';
    }
  }
  return null;
};