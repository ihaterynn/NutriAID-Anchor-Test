import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

const WebcamComponent = ({ setImageData }) => {
    const webcamRef = useRef(null);
    const [image, setImage] = useState(null);

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        setImageData(imageSrc);  // Send image data to the parent component
    };

    return (
        <div>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={400}
            />
            <button onClick={capture}>Capture Photo</button>
            {image && <img src={image} alt="captured" />}
        </div>
    );
};

export default WebcamComponent;
