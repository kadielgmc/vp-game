import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

// Importa los audios desde la carpeta local
import level1 from '../assets/audio/level1.mp3';
import level2 from '../assets/audio/level2.mp3';
import level3 from '../assets/audio/level3.mp3';
import level4 from '../assets/audio/level4.mp3';

const backgroundMusic = {
  level1: new Howl({
    src: [level1],
    loop: true,
    volume: 0.3,
  }),
  level2: new Howl({
    src: [level2],
    loop: true,
    volume: 0.3,
  }),
  level3: new Howl({
    src: [level3],
    loop: true,
    volume: 0.3,
  }),
  level4: new Howl({
    src: [level4],
    loop: true,
    volume: 0.3,
  }),
};

type Level = 'level1' | 'level2' | 'level3' | 'level4';

export const useBackgroundMusic = (level: Level) => {
  const currentMusicRef = useRef<Howl | null>(null);

  useEffect(() => {
    if (currentMusicRef.current) {
      currentMusicRef.current.stop();
    }

    const music = backgroundMusic[level];
    music.play();
    currentMusicRef.current = music;

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
