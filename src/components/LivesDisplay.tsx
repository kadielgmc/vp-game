// LivesDisplay.tsx
import React from 'react';

const LivesDisplay = ({ lives }: { lives: number }) => {
  return (
    <div className="flex items-center mb-4">
      {Array.from({ length: lives }, (_, index) => (
        <span key={index} className="text-2xl text-red-500 mr-1">❤️</span>
      ))}
    </div>
  );
};

export default LivesDisplay;
