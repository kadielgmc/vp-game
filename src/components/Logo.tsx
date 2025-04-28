// Logo.tsx
import React from 'react';

const Logo = ({ mood }: { mood: 'happy' | 'neutral' | 'sad' }) => {
  const faces = {
    happy: '😄',
    neutral: '😐',
    sad: '😞',
  };

  return (
    <div className="text-center text-5xl mb-4">
      {faces[mood]}
    </div>
  );
};

export default Logo;
