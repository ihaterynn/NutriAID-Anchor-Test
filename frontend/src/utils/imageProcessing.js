import Tesseract from 'tesseract.js';

export const extractText = async (file) => {
  const { data: { text } } = await Tesseract.recognize(file, 'eng');
  return text;
};