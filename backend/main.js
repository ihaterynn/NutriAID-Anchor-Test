const { extractText } = require('./imageProcessing');
const { analyzeIngredients } = require('./textAnalysis');
const readline = require('readline');

// Function to get user health conditions
function getUserHealthConditionsAndGoals() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        const healthConditions = [];
        rl.question('Do you have diabetes? (yes/no): ', (diabetes) => {
            if (diabetes.toLowerCase() === 'yes') {
                healthConditions.push('diabetes');
            }
            rl.question('Do you have high blood pressure? (yes/no): ', (highBp) => {
                if (highBp.toLowerCase() === 'yes') {
                    healthConditions.push('high blood pressure');
                }
                rl.question('What is your body weight goal? (maintain/gain/lose): ', (weightGoal) => {
                    rl.close();
                    resolve({ healthConditions, weightGoal });
                });
            });
        });
    });
}

// Function to check calories from the extracted text
function checkCalories(text, weightGoal) {
    const calorieRegex = /calories\s*(\d+)/i;
    const calorieMatch = calorieRegex.exec(text);
    if (calorieMatch) {
        const calories = parseInt(calorieMatch[1], 10);
        if (calories > 200 && (weightGoal === 'maintain' || weightGoal === 'lose')) {
            return 'High Calorie';
        } else if (calories <= 200 && weightGoal === 'gain') {
            return 'Low Calorie';
        }
    }
    return null;
}

// Print section
function printSection(title, content) {
    console.log(`\n${title}:`);
    console.log("-".repeat(title.length + 1));
    content.forEach(item => console.log(`- ${item}`));
}

// Main function
async function main() {
    const { healthConditions, weightGoal } = await getUserHealthConditionsAndGoals();
    const imagePath = './data/labels/test.png';  // Change path based on image
    const text = await extractText(imagePath);

    const calorieWarning = checkCalories(text, weightGoal);
    const { result, conditionWarnings, potentialHarmWarnings } = analyzeIngredients(text, healthConditions);

    let labeledWarnings = [];
    if (conditionWarnings.includes('sugar')) {
        labeledWarnings.push('Diabetes (sugar)');
    }
    if (conditionWarnings.includes('salt')) {
        labeledWarnings.push('High Blood Pressure (salt)');
    }
    if (calorieWarning) {
        labeledWarnings.push(calorieWarning);
    }

    console.log(`\nRecommendation: ${result}`);
    console.log("=".repeat(18));

    if (labeledWarnings.length > 0) {
        printSection('Concerns', labeledWarnings);
    }

    if (potentialHarmWarnings.length > 0) {
        printSection('Potentially Harmful/Unhealthy', potentialHarmWarnings);
    }
}

main();
