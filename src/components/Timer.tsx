import React, { useState, useEffect } from 'react';

interface TimerProps {
  initialSeconds: number;
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialSeconds, onTimeUp }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);
  
  useEffect(() => {
    let interval: number | undefined;
    
    if (isActive && seconds > 0) {
      interval = window.setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      onTimeUp();
    }
    
    return () => clearInterval(interval);
  }, [isActive, seconds, onTimeUp]);
  
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  return (
    <div className="timer-container">
      <span style={{ color: seconds < 30 ? 'var(--error)' : 'var(--text-primary)' }}>
        ⏱️ {formatTime(seconds)}
      </span>
    </div>
  );
};

export default Timer;