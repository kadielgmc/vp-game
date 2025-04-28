import React, { useState } from 'react';
import LivesDisplay from '../components/LivesDisplay';
import ProgressBar from '../components/ProgressBar';
import Logo from '../components/Logo';
import Confetti from 'react-confetti'; // Asegúrate de tener react-confetti instalado

const Level1 = ({ onNextLevel, onGameOver }: { onNextLevel: () => void; onGameOver: () => void }) => {
  const questions = [
    { question: 'The cake ___ eaten by the kids.', options: ['was', 'is', 'are', 'were'], answer: 'was' },
    { question: 'The house ___ built in 1990.', options: ['were', 'is', 'are', 'was'], answer: 'was' },
    { question: 'The dishes ___ washed by my brother.', options: ['was', 'were', 'is', 'are'], answer: 'were' },
    { question: 'The email ___ sent yesterday.', options: ['is', 'was', 'are', 'were'], answer: 'was' },
    { question: 'The dog ___ fed in the morning.', options: ['were', 'is', 'was', 'are'], answer: 'was' },
    { question: 'The car ___ cleaned on Saturday.', options: ['was', 'is', 'are', 'were'], answer: 'was' },
    { question: 'The song ___ sung beautifully.', options: ['are', 'is', 'was', 'were'], answer: 'was' },
    { question: 'The window ___ broken.', options: ['is', 'are', 'was', 'were'], answer: 'was' },
    { question: 'The books ___ organized on the shelf.', options: ['are', 'was', 'is', 'were'], answer: 'are' },
    { question: 'The students ___ informed.', options: ['was', 'is', 'are', 'were'], answer: 'are' },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(4);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [mood, setMood] = useState<'neutral' | 'happy' | 'sad'>('neutral'); // Mood controlado

  const totalQuestions = questions.length;
  const requiredScore = 6;

  const handleAnswer = (option: string) => {
    if (selectedOption) return;

    setSelectedOption(option);

    const isCorrect = option === questions[currentQuestion].answer;

    if (isCorrect) {
      setScore(prev => prev + 1);
      setMood('happy'); // Ponemos feliz
      setTimeout(() => setMood('neutral'), 1000); // Volvemos a neutral después de 1 segundo
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
    setLives(4);
    setSelectedOption(null);
    setShowResult(false);
    setIsVictory(false);
    setMood('neutral'); // Reiniciar mood
  };

  const getStars = () => {
    if (score >= 9) return '⭐⭐⭐';
    if (score >= 7) return '⭐⭐';
    if (score >= 5) return '⭐';
    return '';
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
              ctx.rotate(Math.random() * Math.PI * 2); // Rotar aleatoriamente
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
              <div
                className="bg-blue-500 h-6 text-white flex items-center justify-center"
                style={{ width: `${correctPercentage}%` }}
              >
                {correctPercentage}%
              </div>
            </div>

            <div className="mb-2 text-lg font-semibold text-red-700">{incorrectPercentage}% Incorrectas</div>
            <div className="w-full bg-red-100 rounded-full h-6 overflow-hidden">
              <div
                className="bg-red-500 h-6 text-white flex items-center justify-center"
                style={{ width: `${incorrectPercentage}%` }}
              >
                {incorrectPercentage}%
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-6">
            {isVictory ? (
              <button
                onClick={onNextLevel}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg shadow-md transition"
              >
                Siguiente Nivel
              </button>
            ) : (
              <button
                onClick={handleRetry}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg shadow-md transition"
              >
                Volver a Intentar
              </button>
            )}
            <button
              onClick={onGameOver}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg shadow-md transition"
            >
              Volver al Menú
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Level1;
