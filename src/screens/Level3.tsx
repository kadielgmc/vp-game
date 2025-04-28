import React, { useState, useEffect } from 'react';
import LivesDisplay from '../components/LivesDisplay';
import ProgressBar from '../components/ProgressBar';
import Logo from '../components/Logo';
import Confetti from 'react-confetti'; // asegúrate de tener instalado react-confetti

const Level3 = ({ onNextLevel, onGoHome }: { onNextLevel: () => void; onGoHome: () => void }) => {
  const questions = [
    { question: 'La carta fue enviada.', answer: 'The letter was sent.' },
    { question: 'El auto fue reparado.', answer: 'The car was repaired.' },
    { question: 'La casa fue construida.', answer: 'The house was built.' },
    { question: 'La comida fue preparada.', answer: 'The food was prepared.' },
    { question: 'La puerta fue cerrada.', answer: 'The door was closed.' },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [lives, setLives] = useState(2);
  const [attemptsLeft, setAttemptsLeft] = useState(2);
  const [timeLeft, setTimeLeft] = useState(90);
  const [showResult, setShowResult] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [score, setScore] = useState(0);
  const [mood, setMood] = useState<'neutral' | 'happy' | 'sad'>('neutral');

  const totalQuestions = questions.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowResult(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (lives <= 0) {
      setShowResult(true);
    }
  }, [lives]);

  const handleSubmit = () => {
    if (showResult) return;

    if (userAnswer.trim().toLowerCase() === questions[currentQuestion].answer.toLowerCase()) {
      setScore(prev => prev + 1);
      setMood('happy');
      setTimeout(() => setMood('neutral'), 1000);
      if (currentQuestion + 1 === totalQuestions) {
        setIsVictory(true);
        setShowResult(true);
      } else {
        setCurrentQuestion(prev => prev + 1);
        setUserAnswer('');
        setAttemptsLeft(2);
      }
    } else {
      if (attemptsLeft - 1 <= 0) {
        setLives(prev => prev - 1);
        if (lives - 1 > 0) {
          setCurrentQuestion(prev => prev + 1);
        }
        setAttemptsLeft(2);
        setUserAnswer('');
      } else {
        setAttemptsLeft(prev => prev - 1);
      }
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setUserAnswer('');
    setLives(2);
    setAttemptsLeft(2);
    setTimeLeft(90);
    setScore(0);
    setShowResult(false);
    setIsVictory(false);
    setMood('neutral');
  };

  const correctPercentage = Math.round((score / totalQuestions) * 100);
  const incorrectPercentage = 100 - correctPercentage;

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6 relative">
      {showResult && (
        isVictory ? (
          <Confetti />
        ) : (
          <Confetti
            numberOfPieces={200}
            gravity={0.5}
            recycle={false}
            drawShape={(ctx) => {
              ctx.save();
              ctx.translate(0, 0);
              ctx.rotate(Math.random() * Math.PI * 2);
              ctx.font = '24px sans-serif';
              ctx.fillText('😢', 0, 0);
              ctx.restore();
            }}
          />
        )
      )}

      {!showResult ? (
        <>
          <div className="flex flex-col items-center space-y-6 mb-8 w-full max-w-2xl">
            <Logo mood={mood} />
            <div className="flex justify-between items-center w-full">
              <LivesDisplay lives={lives} />
              <div className="flex items-center space-x-1 text-lg">
                <span>🎯</span>
                <span>{score}/{totalQuestions}</span>
              </div>
            </div>
            <ProgressBar current={currentQuestion + 1} total={totalQuestions} />
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl text-center">
            <h2 className="text-2xl font-bold mb-8">{questions[currentQuestion].question}</h2>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full p-3 border rounded mb-4 text-lg"
              placeholder="Escribe tu respuesta en inglés..."
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg shadow-md transition mb-4"
            >
              Enviar respuesta
            </button>
            <div className="text-lg">⏳ Tiempo restante: {formatTime(timeLeft)}</div>
            <div className="text-md">Intentos restantes: {attemptsLeft}</div>
          </div>
        </>
      ) : (
        <div className="bg-white p-10 rounded-lg shadow-lg text-center w-full max-w-lg">
          <h2 className="text-3xl font-bold mb-6">
            {isVictory ? '🎯 ¡Terminaste la sección Aprendiz!' : '¡Inténtalo de Nuevo!'}
          </h2>

          <div className="text-5xl mb-4">{isVictory ? '⭐⭐⭐' : ''}</div>

          <p className="text-lg mb-6">Respondiste correctamente {score} de {totalQuestions} preguntas.</p>

          <div className="w-full mb-6">
            <div className="mb-2 text-lg font-semibold text-blue-700">{correctPercentage}% Correctas</div>
            <div className="w-full bg-blue-100 rounded-full h-6 mb-6 overflow-hidden">
              <div className="bg-blue-500 h-6 text-white flex items-center justify-center" style={{ width: `${correctPercentage}%` }}>{correctPercentage}%</div>
            </div>

            <div className="mb-2 text-lg font-semibold text-red-700">{incorrectPercentage}% Incorrectas</div>
            <div className="w-full bg-red-100 rounded-full h-6 overflow-hidden">
              <div className="bg-red-500 h-6 text-white flex items-center justify-center" style={{ width: `${incorrectPercentage}%` }}>{incorrectPercentage}%</div>
            </div>
          </div>

          <div className="flex justify-center gap-6">
            {isVictory ? (
              <>
                <button
                  onClick={onNextLevel}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-full text-lg shadow-md transition"
                >
                  Continuar a Sección Maestro
                </button>
                <button
                  onClick={onGoHome}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg shadow-md transition"
                >
                  Volver al Inicio
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleRetry}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg shadow-md transition"
                >
                  Volver a Intentar
                </button>
                <button
                  onClick={onGoHome}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg shadow-md transition"
                >
                  Volver al Inicio
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Level3;
