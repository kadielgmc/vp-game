// ProgressBar.tsx
import React from 'react';

const ProgressBar = ({ current, total }: { current: number; total: number }) => {
  const percentage = (current / total) * 100;
  return (
    <div className="w-full bg-gray-300 rounded-full h-4 mb-4">
      <div
        className="bg-green-500 h-4 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
