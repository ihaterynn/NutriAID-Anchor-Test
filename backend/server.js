const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const { analyzeIngredients } = require('./textAnalysis');
const { checkCalories } = require('./main'); // Assuming you have a main module
const { Connection, PublicKey } = require('@solana/web3.js');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());  // To parse incoming JSON requests
app.use(cors());

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Route for handling image upload and analysis
app.post('/upload', upload.single('label'), async (req, res) => {
    const { healthConditions, weightGoal } = req.body;  // User inputs (JSON format)
    const imagePath = req.file.path;  // Uploaded image path

    try {
        // Step 1: Perform OCR using Tesseract.js
        const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');
        
        // Step 2: Check calories from the extracted text
        const calorieWarning = checkCalories(text, weightGoal);

        // Step 3: Analyze the extracted text for harmful ingredients
        const { result, conditionWarnings, potentialHarmWarnings } = await analyzeIngredients(text, healthConditions);

        // Prepare the response
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

        // Step 4 (Optional): Interact with Solana to store or fetch data (optional)
        // Example: store analysis results on-chain, using web3.js
        // const connection = new Connection(process.env.SOLANA_RPC_URL, 'confirmed');
        // const publicKey = new PublicKey(process.env.USER_PUBLIC_KEY);
        // Call Solana smart contract to store analysis or recommendations
        
        // Step 5: Send back the response to the client
        res.json({
            recommendation: result,
            concerns: labeledWarnings,
            harmfulIngredients: potentialHarmWarnings,
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Server setup
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
