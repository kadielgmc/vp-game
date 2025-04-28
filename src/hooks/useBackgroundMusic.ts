import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

const backgroundMusic = {
  level1: new Howl({
    src: ['https://assets.mixkit.co/music/preview/mixkit-games-children-playing-911.mp3'],
    loop: true,
    volume: 0.3,
  }),
  level2: new Howl({
    src: ['https://assets.mixkit.co/music/preview/mixkit-games-world-background-music-1488.mp3'],
    loop: true,
    volume: 0.3,
  }),
  level3: new Howl({
    src: ['https://assets.mixkit.co/music/preview/mixkit-epic-orchestra-transition-2290.mp3'],
    loop: true,
    volume: 0.3,
  }),
};

type Level = 'level1' | 'level2' | 'level3';

export const useBackgroundMusic = (level: Level) => {
  const currentMusicRef = useRef<Howl | null>(null);

  useEffect(() => {
    // Stop any currently playing music
    if (currentMusicRef.current) {
      currentMusicRef.current.stop();
    }

    // Start new music
    const music = backgroundMusic[level];
    music.play();
    currentMusicRef.current = music;

    // Cleanup function
    return () => {
      if (currentMusicRef.current) {
        currentMusicRef.current.stop();
      }
    };
  }, [level]);

  return {
    stopMusic: () => {
      if (currentMusicRef.current) {
        currentMusicRef.current.stop();
      }
    },
  };
};