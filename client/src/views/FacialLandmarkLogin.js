import React, { useRef, useEffect } from 'react';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

function FacialLandmarkLogin() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const modelRef = useRef(null);

    useEffect(() => {
        // Load the face landmarks detection model
        async function loadModel() {
            modelRef.current = await faceLandmarksDetection.load(
                faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
                { shouldLoadIrisModel: true }
            );

            // Start the webcam feed
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;

            // Wait for the video to load metadata and start processing frames
            videoRef.current.onloadedmetadata = () => {
                videoRef.current.play();
                detectFaceLandmarks();
            };
        }

        loadModel();
    }, []);

    // Function to detect face landmarks
    async function detectFaceLandmarks() {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        while (true) {
            const predictions = await modelRef.current.estimateFaces({ input: videoRef.current });

            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw face landmarks
            if (predictions.length > 0) {
                for (const prediction of predictions) {
                    const keypoints = prediction.scaledMesh;

                    // Draw keypoints on the canvas
                    for (const point of keypoints) {
                        ctx.beginPath();
                        ctx.arc(point[0], point[1], 2, 0, 2 * Math.PI);
                        ctx.fillStyle = 'red';
                        ctx.fill();
                    }
                }
            }

            // Request the next animation frame
            requestAnimationFrame(detectFaceLandmarks);
        }
    }

    return (
        <div>
            <video ref={videoRef} width="640" height="480" autoPlay />
            <canvas ref={canvasRef} width="640" height="480" />
        </div>
    );
}

export default FacialLandmarkLogin;
