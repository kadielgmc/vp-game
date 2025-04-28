import React from 'react';
import Logo from '../components/Logo';
import { useGame } from '../context/GameContext';

interface HomeProps {
  onNavigate: (screen: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { resetGame } = useGame();

  const handleLevelSelect = (level: string) => {
    resetGame();
    onNavigate(level);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8">
      <div className="text-center mb-8">
        <Logo size="large" mood="happy" />
        <h1 className="text-4xl font-bold mt-6 mb-2 text-primary">VP – Aprende Passive Voice Jugando</h1>
        <p className="text-xl mb-8 px-4 py-3 bg-accent text-text-primary rounded-lg font-bold inline-block mt-4">
          ¿Una clase aburrida? Nah... ¡Esto es una misión de inglés!
        </p>
      </div>

      {/* Sección Aprendiz */}
      <div className="flex flex-col items-center w-full max-w-md px-4 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-blue-500">Sección Aprendiz 👩‍🎓👨‍🎓</h2>

        <button 
          className="level-button level-1"
          onClick={() => handleLevelSelect('level1')}
        >
          Nivel 1
        </button>

        <button 
          className="level-button level-2 mt-4"
          onClick={() => handleLevelSelect('level2')}
        >
          Nivel 2
        </button>

        <button 
          className="level-button level-3 mt-4"
          onClick={() => handleLevelSelect('level3')}
        >
          Nivel 3
        </button>
      </div>

      {/* Sección Maestro */}
      <div className="flex flex-col items-center w-full max-w-md px-4">
        <h2 className="text-2xl font-bold mb-6 text-purple-600">Sección Maestro 🧙‍♂️🧙‍♀️</h2>

        <button 
          className="level-button level-4"
          onClick={() => handleLevelSelect('level4')}
        >
          Nivel 4 (Boss Final)
        </button>
      </div>

      <div className="mt-12 text-center px-4">
        <p className="text-text-secondary">
          Cada sección tiene desafíos únicos.<br/>
          ¡Completa la sección Aprendiz y conviértete en un Maestro de Passive Voice!
        </p>
      </div>
    </div>
  );
};

export default Home;
