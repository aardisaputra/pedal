"use client";
import Image from "next/image";
import VideoRecorder from "../../components/VideoRecorder";
import { useSubject } from "../../context/SubjectContext";

export default function Record() {
  const { selectedSubject, setSelectedSubject } = useSubject();
  console.log(selectedSubject);
  return (
    <main>
      <div className="flex bg-white h-screen justify-center">
        <div className="flex-col mt-32">
          <VideoRecorder />
        </div>
      </div>
    </main>
  );
}
