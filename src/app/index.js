'use client'
import { useSubject } from '../context/SubjectContext';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAmericas, faFlask, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import styles from './Page.module.css';

export default function Home() {
  const { selectedSubject, setSelectedSubject } = useSubject();
  const router = useRouter();

  const handleStartLecturing = () => {
    router.push('/page');  // Navigate to 'page.tsx'
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
      {selectedSubject && (
        <button className={styles.startButton} onClick={handleStartLecturing}>
          Start Lecturing
        </button>
      )}
    </main>
  );
}