import Image from "next/image";
import VideoRecorder from "../components/VideoRecorder";

export default function Record() {
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
