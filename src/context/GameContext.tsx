import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Howl } from 'howler';

interface GameContextProps {
  score: number;
  setScore: (score: number) => void;
  lives: number;
  setLives: (lives: number) => void;
  resetGame: () => void;
  playSound: (soundType: 'correct' | 'incorrect' | 'win' | 'lose') => void;
  showConfetti: () => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

const soundEffects = {
  correct: new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3'],
    volume: 0.5,
  }),
  incorrect: new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3'],
    volume: 0.5,
  }),
  win: new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3'],
    volume: 0.5,
  }),
  lose: new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-ominous-drums-227.mp3'],
    volume: 0.5,
  }),
};

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(4);

  const resetGame = () => {
    setScore(0);
    setLives(4);
  };

  const playSound = (soundType: 'correct' | 'incorrect' | 'win' | 'lose') => {
    const sound = soundEffects[soundType];
    if (sound) {
      sound.play();
    }
  };

  const showConfetti = () => {
    const confettiCount = 100;
    const container = document.querySelector('.app-container');
    
    if (container) {
      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.animationDuration = `${Math.random() * 2 + 2}s`;
        confetti.style.animationDelay = `${Math.random() * 0.5}s`;
        
        container.appendChild(confetti);
        
        setTimeout(() => {
          confetti.remove();
        }, 3000);
      }
    }
  };

  const value = {
    score,
    setScore,
    lives,
    setLives,
    resetGame,
    playSound,
    showConfetti
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = (): GameContextProps => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};