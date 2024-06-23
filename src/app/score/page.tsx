import type { NextPage } from 'next';
import Head from 'next/head';
import SimpleLectureScore from './components/LectureScore';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <Head>
        <title>Simple Lecture Score</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <SimpleLectureScore overallScore={78} deliveryScore={90} />
      </main>
    </div>
  );
};

export default Home;