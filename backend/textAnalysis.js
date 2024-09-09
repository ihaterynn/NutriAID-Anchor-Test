const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Function to analyze ingredients against health conditions
function analyzeIngredients(text, healthConditions) {
    const harmfulDataPath = path.resolve('./data/harmful_ingredients.csv');
    let harmfulData = [];

    // Load harmful ingredients from CSV
    return new Promise((resolve, reject) => {
        fs.createReadStream(harmfulDataPath)
            .pipe(csv())
            .on('data', (row) => {
                harmfulData.push(row);
            })
            .on('end', () => {
                let warnings = [];
                let potentialHarmWarnings = [];

                healthConditions.forEach(condition => {
                    harmfulData
                        .filter(row => row.harmful_for === condition)
                        .forEach(row => {
                            if (text.toLowerCase().includes(row.ingredient.toLowerCase())) {
                                warnings.push(row.ingredient);
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

                harmfulData
                    .filter(row => row.harmful_for === 'all')
                    .forEach(row => {
                        if (text.toLowerCase().includes(row.ingredient.toLowerCase())) {
                            potentialHarmWarnings.push(row.ingredient);
                        }
                    });

                // Remove duplicates
                warnings = [...new Set(warnings)];
                potentialHarmWarnings = [...new Set(potentialHarmWarnings)];

                // Return the result, warnings, and potential harmful ingredients
                resolve({
                    result: warnings.length > 0 || potentialHarmWarnings.length > 0 ? 'No' : 'Yes',
                    conditionWarnings: warnings,
                    potentialHarmWarnings: potentialHarmWarnings
                });
            })
            .on('error', reject);
    });
}

module.exports = { analyzeIngredients };
