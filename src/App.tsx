// App.tsx
import React, { useState } from 'react';
import Home from './screens/Home';
import Level1 from './screens/Level1';
import Level2 from './screens/Level2';
import Level3 from './screens/Level3';
import Level4 from './screens/Level4';
import Logo from './components/Logo';
import logoImage from './assets/logo.png'; // 👈 tu logo

const App = () => {
  const [screen, setScreen] = useState<'menu' | 'level1' | 'level2' | 'level3' | 'level4' | 'victory' | 'end'>('menu');

  const goToMenu = () => setScreen('menu');
  const startLevel1 = () => setScreen('level1');
  const startLevel2 = () => setScreen('level2');
  const startLevel3 = () => setScreen('level3');
  const startLevel4 = () => setScreen('level4');
  const finishVictory = () => setScreen('victory');
  const finishGame = () => setScreen('end');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      {screen === 'menu' && (
        <div className="text-center">
          {/* ✅ Nuevo logo agregado */}
          <img src={logoImage} alt="Mi logo" className="w-32 h-auto mx-auto mb-4" />

          <h1 className="text-3xl font-bold mb-4">¡Aprende Passive Voice Jugando! 🎯</h1>

          {/* Sección Aprendiz */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-500">Sección Aprendiz 👩‍🎓👨‍🎓</h2>
            <div className="flex flex-col gap-4">
              <button
                onClick={startLevel1}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full text-xl shadow-md transition"
              >
                Nivel 1
              </button>
              <button
                onClick={startLevel2}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full text-xl shadow-md transition"
              >
                Nivel 2
              </button>
              <button
                onClick={startLevel3}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full text-xl shadow-md transition"
              >
                Nivel 3
              </button>
            </div>
          </div>

          {/* Sección Maestro */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">Sección Maestro 🧙‍♂️🧙‍♀️</h2>
            <div className="flex flex-col gap-4">
              <button
                onClick={startLevel4}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-xl shadow-md transition"
              >
                Nivel 4 (Boss Final)
              </button>
            </div>
          </div>
        </div>
      )}

      {screen === 'level1' && <Level1 onNextLevel={startLevel2} onGameOver={goToMenu} />}
      {screen === 'level2' && <Level2 onNextLevel={startLevel3} onGameOver={goToMenu} />}
      {screen === 'level3' && <Level3 onNextLevel={startLevel4} onGoHome={goToMenu} />}
      {screen === 'level4' && <Level4 onVictory={finishVictory} onGameOver={goToMenu} />}

      {screen === 'victory' && (
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-6 text-green-600 animate-bounce">
            🏆 ¡MISIÓN CUMPLIDA, AGENTE!
          </h2>
          <p className="mb-6 text-lg text-text-primary">
            Completaste todos los desafíos del Passive Voice Master.<br />
            ¡Eres oficialmente un Maestro de la Voz Pasiva en inglés! 🇬🇧👨‍🎓👩‍🎓
          </p>
          <button
            onClick={goToMenu}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-xl shadow-md transition"
          >
            Volver al Menú Principal
          </button>
        </div>
      )}

      {screen === 'end' && (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-red-500">¡Fin del juego! 💔</h2>
          <p className="mb-6 text-lg">Puedes volver al menú para intentarlo de nuevo.</p>
          <button
            onClick={goToMenu}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full text-xl shadow-md transition"
          >
            Volver al Menú
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
