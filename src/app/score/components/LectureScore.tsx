import React from 'react';

interface SimpleLectureScoreProps {
  overallScore: number;
  deliveryScore: number;
}

const SimpleLectureScore: React.FC<SimpleLectureScoreProps> = ({ overallScore, deliveryScore }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-8">Your overall score</h1>
      
      <div className="flex items-center justify-center mb-8">
        <div className="w-32 h-32 rounded-full border-4 border-orange-400 flex items-center justify-center mr-8">
          <span className="text-4xl font-bold">{overallScore}</span>
        </div>
        <p className="text-xl">Your lecture scored {overallScore} out of 100.</p>
      </div>

      <div className="bg-orange-300 rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">Delivery Score</h2>
        <p className="text-4xl font-bold mb-2">{deliveryScore}</p>
        <div className="mb-2">
          <span className="mr-2">😍</span>Lovely 20pt
        </div>
        <div className="mb-2">
          <span className="mr-2">😊</span>Happy 30pt
        </div>
        <div>
          <span className="mr-2">😱</span>Scared 5pt
        </div>
      </div>
    </div>
  );
};

export default SimpleLectureScore;