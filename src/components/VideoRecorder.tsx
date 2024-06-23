"use client";
import React, { useRef, useState, useEffect } from "react";
import LectureScore from '../app/score/components/LectureScore';
import Link from 'next/link';


const VideoRecorder = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [doneRecording, setDoneRecording] = useState(false);

  useEffect(() => {
    const initializeCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
      } catch (err) {
        setError("Failed to access the camera. Please allow camera access.");
      }
    };

    initializeCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const startRecording = async () => {
    setRecordedChunks([]);
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.muted = true; // Mute the video element to prevent audio playback
    }

    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    };
    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);

    setDoneRecording(true);
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recording.webm";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log("test test test");

    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/data");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchData();
  };

  return (
    <div className="text-black">
      <video ref={videoRef} autoPlay playsInline></video>
      <div className="flex justify-center">
        {!doneRecording && (
          <div>
            <button
              className="bg-gray-300 mt-5"
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? (
              <Link href="score/">
              Stop Recording
            </Link>) : "Start Recording"}
            </button>
          </div>
        )}
      </div>
      {data && <LectureScore result={data} />}
    </div>
  );
};

export default VideoRecorder;
