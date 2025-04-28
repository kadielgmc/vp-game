import React, { useState, useEffect } from 'react';
import LivesDisplay from '../components/LivesDisplay';
import ProgressBar from '../components/ProgressBar';
import Logo from '../components/Logo';
import Confetti from 'react-confetti';

const Level2 = ({ onNextLevel, onGameOver }: { onNextLevel: () => void; onGameOver: () => void }) => {
  const questions = [
    { question: 'The food ___ prepared by the chef.', options: ['was', 'is', 'are', 'were'], answer: 'was' },
    { question: 'The photos ___ taken yesterday.', options: ['is', 'was', 'are', 'were'], answer: 'were' },
    { question: 'The letters ___ sent last week.', options: ['was', 'is', 'were', 'are'], answer: 'were' },
    { question: 'The door ___ locked by the guard.', options: ['was', 'is', 'are', 'were'], answer: 'was' },
    { question: 'The songs ___ sung beautifully.', options: ['is', 'are', 'was', 'were'], answer: 'are' },
    { question: 'The homework ___ completed early.', options: ['is', 'were', 'was', 'are'], answer: 'was' },
    { question: 'The walls ___ painted white.', options: ['was', 'is', 'are', 'were'], answer: 'are' },
    { question: 'The shirts ___ ironed.', options: ['was', 'were', 'is', 'are'], answer: 'were' },
    { question: 'The coffee ___ made fresh.', options: ['was', 'is', 'are', 'were'], answer: 'was' },
    { question: 'The chairs ___ arranged neatly.', options: ['were', 'is', 'was', 'are'], answer: 'are' },
    { question: 'The reports ___ delivered on time.', options: ['were', 'is', 'are', 'was'], answer: 'were' },
    { question: 'The documents ___ printed yesterday.', options: ['are', 'is', 'was', 'were'], answer: 'were' },
    { question: 'The games ___ played outside.', options: ['are', 'was', 'is', 'were'], answer: 'are' },
    { question: 'The lunch ___ served at noon.', options: ['are', 'is', 'was', 'were'], answer: 'was' },
    { question: 'The glasses ___ cleaned properly.', options: ['are', 'is', 'was', 'were'], answer: 'are' },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(120);
  const [showResult, setShowResult] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [mood, setMood] = useState<'neutral' | 'happy' | 'sad'>('neutral');

  const totalQuestions = questions.length;
  const requiredScore = 12;

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

  const handleAnswer = (option: string) => {
    if (selectedOption) return;

    setSelectedOption(option);
    const isCorrect = option === questions[currentQuestion].answer;

    if (isCorrect) {
      setScore(prev => prev + 1);
      setMood('happy');
      setTimeout(() => setMood('neutral'), 1000);
    } else {
      setLives(prev => prev - 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 === totalQuestions || lives - (isCorrect ? 0 : 1) <= 0) {
        if (score + (isCorrect ? 1 : 0) >= requiredScore) {
          setIsVictory(true);
        }
        setShowResult(true);
      } else {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
      }
    }, 800);
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setScore(0);
    setLives(3);
    setSelectedOption(null);
    setTimeLeft(120);
    setShowResult(false);
    setIsVictory(false);
    setMood('neutral');
  };

  const getStars = () => {
    if (score >= 14) return '⭐⭐⭐';
    if (score >= 12) return '⭐⭐';
    if (score >= 10) return '⭐';
    return '';
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const correctPercentage = Math.round((score / totalQuestions) * 100);
  const incorrectPercentage = 100 - correctPercentage;

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
                <span>{score}/{requiredScore}</span>
              </div>
            </div>
            <ProgressBar current={currentQuestion + 1} total={totalQuestions} />
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl text-center">
            <h2 className="text-2xl font-bold mb-8">{questions[currentQuestion].question}</h2>
            <div className="grid grid-cols-2 gap-6">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`p-4 rounded-xl text-lg font-semibold shadow-md ${
                    selectedOption === option
                      ? option === questions[currentQuestion].answer
                        ? 'bg-green-300'
                        : 'bg-red-300'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="mt-6 text-lg font-semibold">⏳ Tiempo restante: {formatTime(timeLeft)}</div>
          </div>
        </>
      ) : (
        <div className="bg-white p-10 rounded-lg shadow-lg text-center w-full max-w-lg">
          <h2 className="text-3xl font-bold mb-6">{isVictory ? '¡Nivel Completado!' : '¡Inténtalo de Nuevo!'}</h2>
          <div className="text-5xl mb-4">{getStars()}</div>
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
              <button onClick={onNextLevel} className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg shadow-md transition">
                Siguiente Nivel
              </button>
            ) : (
              <button onClick={handleRetry} className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg shadow-md transition">
                Volver a Intentar
              </button>
            )}
            <button onClick={onGameOver} className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg shadow-md transition">
              Volver al Menú
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Level2;
