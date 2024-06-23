'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import styles from './Page.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAmericas, faFlask, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

const SubjectContext = createContext();
export const useSubject = () => useContext(SubjectContext);

export default function Home() {
  const [selectedSubject, setSelectedSubject] = useState('');
  const router = useRouter(); // Get the router instance

  const handleStartLearning = () => {
    router.push('/record/page'); // Navigate to localhost:3000/record
  };


  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.header}>What do you want to teach today?</h1>
      <div className={styles.optionsContainer}>
        <button className={styles.option} onClick={() => setSelectedSubject('Geography')}>
          <FontAwesomeIcon icon={faGlobeAmericas} size="3x" />
          <p>Geography</p>
        </button>
        <button className={styles.option} onClick={() => setSelectedSubject('Biology')}>
          <FontAwesomeIcon icon={faFlask} size="3x" />
          <p>Biology</p>
        </button>
        <button className={styles.option} onClick={() => setSelectedSubject('History')}>
          <FontAwesomeIcon icon={faBookOpen} size="3x" />
          <p>History</p>
        </button>
      </div>
      <button className={styles.startButton} onClick={handleStartLearning}>
        Start Learning
      </button>
    </main>
  );


}
// 'use client'
// import { createContext, useContext, useState } from 'react';
// import styles from './Page.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGlobeAmericas, faFlask, faBookOpen } from '@fortawesome/free-solid-svg-icons';

// const SubjectContext = createContext();
// export const useSubject = () => useContext(SubjectContext);


// export default function Home() {
//   const [selectedSubject, setSelectedSubject] = useState(''); // Initialize with empty string or null

//   return (
//     <main className={styles.mainContainer}>
//       <h1 className={styles.header}>What do you want to teach today?</h1>
//       <div className={styles.optionsContainer}>
//         <button className={styles.option} onClick={() => setSelectedSubject('Geography')}>
//           <FontAwesomeIcon icon={faGlobeAmericas} size="3x" />
//           <p>Geography</p>
//         </button>
//         <button className={styles.option} onClick={() => setSelectedSubject('Biology')}>
//           <FontAwesomeIcon icon={faFlask} size="3x" />
//           <p>Biology</p>
//         </button>
//         <button className={styles.option} onClick={() => setSelectedSubject('History')}>
//           <FontAwesomeIcon icon={faBookOpen} size="3x" />
//           <p>History</p>
//         </button>
//         <button className={styles.option} onClick={() => setSelectedSubject('History')}>
//           <FontAwesomeIcon icon={faBookOpen} size="3x" />
//           <p>History</p>
//         </button>
//       </div>
//     </main>
//   );
// }


// export default function Home() {
//   const [selectedSubject, setSelectedSubject] = useState('');

//   const handleOptionClick = (subject) => {
//     setSelectedSubject(subject);
//     console.log(`Selected Subject: ${subject}`); 
//   };
  

  // return (
  //   <main className={styles.mainContainer}>
  //     <h1 className={styles.header}>What do you want to teach today?</h1>
  //     <div className={styles.optionsContainer}>
  //       {/* Each button now clearly focuses on the icon for interaction */}
  //       <button className={styles.option} onClick={() => handleOptionClick('Geography')}>
  //         <FontAwesomeIcon icon={faGlobeAmericas} size="3x" />
  //         <p>Geography</p>
  //       </button>
  //       <button className={styles.option} onClick={() => handleOptionClick('Biology')}>
  //         <FontAwesomeIcon icon={faFlask} size="3x" />
  //         <p>Biology</p>
  //       </button>
  //       <button className={styles.option} onClick={() => handleOptionClick('History')}>
  //         <FontAwesomeIcon icon={faBookOpen} size="3x" />
  //         <p>History</p>
  //       </button>
  //     </div>
  //     {selectedSubject && (
  //       <button className={styles.startButton} onClick={() => alert(`Starting lecture on ${selectedSubject}`)}>
  //         Start Lecturing
  //       </button>
  //     )}


  //   </main>
//   // );
// }
