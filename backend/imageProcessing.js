const Tesseract = require('tesseract.js');
const path = require('path');

// Function to extract text from image
const extractText = (imagePath) => {
    return new Promise((resolve, reject) => {
        Tesseract.recognize(path.resolve(imagePath), 'eng')
            .then(({ data: { text } }) => {
                resolve(text);
            })
            .catch(error => {
                reject(error);
            });
    });
};

module.exports = { extractText };
