import React, { useRef, useState } from 'react';

const WebcamComponent = () => {
  const videoRef = useRef(null);
  const [photo, setPhoto] = useState(null);

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => console.error(error));
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const photoData = canvas.toDataURL('image/png');
    setPhoto(photoData);
  };

  return (
    <div>
      <h2>Webcam</h2>
      <button onClick={startCamera}>Start Camera</button>
      <video ref={videoRef} autoPlay />
      <button onClick={takePhoto}>Take Photo</button>
      {photo && (
        <div>
          <h3>Captured Photo</h3>
          <img src={photo} alt="Captured" />
        </div>
      )}
    </div>
  );
};

export default WebcamComponent;
