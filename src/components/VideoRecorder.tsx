"use client";
import React, { useRef, useState, useEffect } from "react";
const VideoRecorder = () => {
  const [recording, setRecording] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
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
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
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
      <video ref={videoRef} autoPlay muted style={{ width: "100%" }}></video>
      {recording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}
    </div>
  );
};
export default VideoRecorder;