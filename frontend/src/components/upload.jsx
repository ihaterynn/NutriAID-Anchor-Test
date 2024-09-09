import React, { useState } from 'react';
import axios from 'axios';

const UploadComponent = () => {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState('');

    const handleUpload = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('label', file);

        try {
            const res = await axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResult(res.data.text);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleUpload} />
            <button onClick={handleSubmit}>Upload</button>
            <pre>{result}</pre>
        </div>
    );
};

export default UploadComponent;
