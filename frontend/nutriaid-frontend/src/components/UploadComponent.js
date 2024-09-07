import React, { useState } from 'react';
import axios from 'axios';
import WebcamComponent from './WebcamComponent';

const UploadComponent = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [result, setResult] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        if (selectedFile) {
            formData.append('label', selectedFile);
        } else if (imageData) {
            formData.append('label', imageData);
        }

        // Add health condition and weight goal here as part of JSON body
        formData.append('healthConditions', JSON.stringify(['diabetes']));
        formData.append('weightGoal', 'maintain');

        try {
            const response = await axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResult(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Upload or Capture Food Label</h1>
            <input type="file" onChange={handleFileChange} />
            <WebcamComponent setImageData={setImageData} />
            <button onClick={handleUpload}>Submit</button>

            {result && (
                <div>
                    <h3>Result:</h3>
                    <p>Recommendation: {result.recommendation}</p>
                    <p>Concerns: {result.concerns.join(', ')}</p>
                    <p>Harmful Ingredients: {result.harmfulIngredients.join(', ')}</p>
                </div>
            )}
        </div>
    );
};

export default UploadComponent;
