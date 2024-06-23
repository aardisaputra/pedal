"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from 'next/link'; // Import Link from Next.js
import LectureScore from '../app/score/components/LectureScore';

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
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        chunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: "video/webm",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "recording.webm";
        a.click();
        URL.revokeObjectURL(url);
        chunksRef.current = [];
      };
      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  };
  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      console.log("test test test");
      const fetchData = async () => {
        try {
          const response = await fetch("http://127.0.0.1:5000/api/data");
          const result = await response.json();
          console.log(result);
          setData(result);
        } catch (error: any) {
          console.log(error);
        }
      };
      fetchData();
    }
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
                </Link>
              ) : (
                "Start Recording"
              )}
            </button>
          </div>
        )}
      </div>
      {data && <LectureScore result={data} />}
    </div>
  );
};

export default VideoRecorder;