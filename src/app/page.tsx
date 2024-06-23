"use client";
import Image from "next/image";
import VideoRecorder from "../components/VideoRecorder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobeAmericas,
  faFlask,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Page.module.css";
import Link from "next/link";
import { useSubject } from "../context/SubjectContext";

export default function Home() {
  const { selectedSubject, setSelectedSubject } = useSubject();

  return (
    <main className={styles.mainContainer}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.header}>What do you want to teach today?</h1>
        <div className={styles.optionsContainer}>
          <button
            className={styles.option}
            onClick={() => setSelectedSubject("Geography")}
          >
            <FontAwesomeIcon icon={faGlobeAmericas} size="3x" />
            <p>Geography</p>
          </button>
          <button
            className={styles.option}
            onClick={() => setSelectedSubject("Biology")}
          >
            <FontAwesomeIcon icon={faFlask} size="3x" />
            <p>Biology</p>
          </button>
          <button
            className={styles.option}
            onClick={() => setSelectedSubject("History")}
          >
            <FontAwesomeIcon icon={faBookOpen} size="3x" />
            <p>History</p>
          </button>
        </div>
        <button className={styles.startButton}>
          <Link href="/record">Start Teaching</Link>
        </button>
      </div>
    </main>
  );
}


// "use client";
// import Image from "next/image";
// import VideoRecorder from "../components/VideoRecorder";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faGlobeAmericas,
//   faFlask,
//   faBookOpen,
// } from "@fortawesome/free-solid-svg-icons";
// import styles from "./Page.module.css";
// import Link from "next/link";
// import { useSubject } from "../context/SubjectContext";
// import { createContext, useContext, useState, useEffect } from "react";

// export default function Home() {
//   const { selectedSubject, setSelectedSubject } = useSubject();
//   return (
//     <main className={styles.mainContainer}>
//       <h1 className={styles.header}>What do you want to teach today?</h1>
//       <div className={styles.optionsContainer}>
//         <button
//           className={styles.option}
//           onClick={() => setSelectedSubject("Geography")}
//         >
//           <FontAwesomeIcon icon={faGlobeAmericas} size="5x" />
//           <p>Geography</p>
//         </button>
//         <button
//           className={styles.option}
//           onClick={() => setSelectedSubject("Biology")}
//         >
//           <FontAwesomeIcon icon={faFlask} size="5x" />
//           <p>Biology</p>
//         </button>
//         <button
//           className={styles.option}
//           onClick={() => setSelectedSubject("History")}
//         >
//           <FontAwesomeIcon icon={faBookOpen} size="5x" />
//           <p>History</p>
//         </button>
//       </div>
//       <button className={styles.startButton}>
//         <Link href="/record">Start Teaching</Link>
//       </button>
//     </main>
//   );
// }
