"use client";
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface LectureScoreProps {
  result: {
    content_score: number;
    delivery_score: number;
    quiz: {
      questions: {
        correct_answer: string;
        gpt_answer: string;
        options: { [key: string]: string };
        question: string;
      }[];
    };
    top_emotions: [string, number][];
    quiz_colors: { [key: string]: string }[];
  };
}

const LectureScore: React.FC<LectureScoreProps> = ({ result }) => {
  const overallScore = Math.round((result.content_score + result.delivery_score) / 2);

  const topEmotions = result.top_emotions.map(([emotion, points]) => ({
    emotion,
    points: points.toFixed(4),
    emoji: emotion === "Calmness" ? "😊" : emotion === "Sadness" ? "😢" : "💪"
  }));

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-5xl font-bold text-center mb-8 text-black">Your overall score</h1>
      
      <div className="flex items-center justify-center mb-8">
        <div className="w-48 h-48 mr-8">
          <CircularProgressbar 
            value={overallScore}
            text={`${overallScore}`}
            styles={buildStyles({
              textSize: '24px',
              pathColor: '#e27d60',
              textColor: '#333',
            })}
          />
        </div>
        <p className="text-xl text-black">Your lecture scored {overallScore} out of 100.</p>
      </div>

      <div className="flex space-x-4">
        <div className="bg-[#e27d60] rounded-lg p-4" style={{ flex: '1 0 30%' }}>
          <h2 className="text-2xl font-bold mb-4">Delivery Score</h2>
          <p className="text-5xl font-bold mb-4">{result.delivery_score}</p>
          <h3 className="text-xl font-bold mb-4">Top 3 Emotions:</h3>
          {topEmotions.map((emotion, index) => (
            <div key={index} className="mb-2">
              <span className="mr-2">{emotion.emoji}</span>{emotion.emotion} {emotion.points}
            </div>
          ))}
        </div>
        
        <div className="bg-[#e27d60] rounded-lg p-4" style={{ flex: '1 0 70%' }}>
          <h2 className="text-2xl font-bold mb-4">Content Score</h2>
          <p className="text-5xl font-bold mb-4">{result.content_score}</p>

          {result.quiz.questions.map((question, index) => (
            <div key={index} className="flex items-center mb-4">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white mr-4">
                {index + 1}
              </div>
              <div className="flex-grow">
                <p className="mb-1">{question.question}</p>
                <div className="flex flex-wrap space-x-2">
                  {Object.entries(question.options).map(([key, value]) => (
                    <div 
                      key={key} 
                      className={`flex items-center justify-center px-4 py-1 rounded-md ${
                        result.quiz_colors[index][key]
                      } w-24 text-center border`}
                      style={{
                        backgroundColor: result.quiz_colors[index][key],
                        color: 'black', // Ensure text color is black
                      }}
                    >
                      {value}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LectureScore;