"use client";
import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const LectureScore = dynamic(() => import("./components/LectureScore"), { ssr: false });

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <Head>
        <title>Lecture Score</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-black mb-8">Lecture Score</h1>
        <LectureScore 
          result={{
            "content_score": 33,
            "delivery_score": 68,
            "overall_score": 50.5,
            "quiz": {
              "questions": [
                {
                  "correct_answer": "C",
                  "gpt_answer": "C",
                  "options": {
                    "A": "George Washington",
                    "B": "Benjamin Franklin",
                    "C": "Thomas Jefferson",
                    "D": "John Adams"
                  },
                  "question": "Who was the primary author of the Declaration of Independence?"
                },
                {
                  "correct_answer": "A",
                  "gpt_answer": "B",
                  "options": {
                    "A": "1775",
                    "B": "1776",
                    "C": "1781",
                    "D": "1783"
                  },
                  "question": "In which year did the American Revolutionary War officially begin?"
                },
                {
                  "correct_answer": "B",
                  "gpt_answer": "D",
                  "options": {
                    "A": "Battle of Bunker Hill",
                    "B": "Battle of Saratoga",
                    "C": "Battle of Yorktown",
                    "D": "Battle of Lexington and Concord"
                  },
                  "question": "Which battle is considered the turning point of the American Revolutionary War?"
                }
              ],
              "topic": "American Revolutionary War"
            },
            "quiz_colors": [
              {
                "A": "white",
                "B": "white",
                "C": "#90d667",
                "D": "white"
              },
              {
                "A": "#f2f272",
                "B": "#eb4949",
                "C": "white",
                "D": "white"
              },
              {
                "A": "white",
                "B": "#f2f272",
                "C": "white",
                "D": "#eb4949"
              }
            ],
            "top_emotions": [
              [
                "Calmness",
                0.214
              ],
              [
                "Sadness",
                0.189
              ],
              [
                "Determination",
                0.186
              ]
            ],
            "transcript": " I pledge allegiance to the flag. Among Gh, I'm American. The independence declaration was made by Thomas Jefferson."
          }}
        />
      </main>
    </div>
  );
};

export default Home;

