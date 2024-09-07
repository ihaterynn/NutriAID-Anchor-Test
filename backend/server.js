const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const { Connection, PublicKey } = require('@solana/web3.js');
require('dotenv').config();

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('label'), (req, res) => {
    const imagePath = req.file.path;

    // Perform OCR using tesseract.js
    Tesseract.recognize(imagePath, 'eng')
        .then(result => {
            const text = result.data.text;
            // Call the Solana smart contract with the result
            // Store analysis or make health-based recommendations
            res.json({ text });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
