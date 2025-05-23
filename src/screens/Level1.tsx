import React, { useState } from 'react';
import LivesDisplay from '../components/LivesDisplay';
import ProgressBar from '../components/ProgressBar';
import Logo from '../components/Logo';
import Confetti from 'react-confetti';
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';

const Level1 = ({ onNextLevel, onGameOver }: { onNextLevel: () => void; onGameOver: () => void }) => {
  useBackgroundMusic('level1');

  const questions = [
    { question: 'The cake ___ eaten by the kids.<br />El pastel ___ comido por los niños.', options: ['was/fue', 'is/es', 'are/son', 'were/fueron'], answer: 'was/fue' },
    { question: 'The house ___ built in 1990.<br />La casa ___ construida en 1990.', options: ['were/fueron', 'is/es', 'are/son', 'was/fue'], answer: 'was/fue' },
    { question: 'The dishes ___ washed by my brother.<br />Los platos ___ lavados por mi hermano.', options: ['was/fue', 'were/fueron', 'is/es', 'are/son'], answer: 'were/fueron' },
    { question: 'The email ___ sent yesterday.<br />El correo ___ enviado ayer.', options: ['is/es', 'was/fue', 'are/son', 'were/fueron'], answer: 'was/fue' },
    { question: 'The dog ___ fed in the morning.<br />El perro ___ alimentado en la mañana.', options: ['were/fueron', 'is/es', 'was/fue', 'are/son'], answer: 'was/fue' },
    { question: 'The car ___ cleaned on Saturday.<br />El auto ___ limpiado el sábado.', options: ['was/fue', 'is/es', 'are/son', 'were/fueron'], answer: 'was/fue' },
    { question: 'The song ___ sung beautifully.<br />La canción ___ cantada hermosamente.', options: ['are/son', 'is/es', 'was/fue', 'were/fueron'], answer: 'was/fue' },
    { question: 'The window ___ broken.<br />La ventana ___ rota.', options: ['is/es', 'are/son', 'was/fue', 'were/fueron'], answer: 'was/fue' },
    { question: 'The books ___ organized on the shelf.<br />Los libros ___ organizados en la estantería.', options: ['are/son', 'was/fue', 'is/es', 'were/fueron'], answer: 'are/son' },
    { question: 'The students ___ informed.<br />Los estudiantes ___ informados.', options: ['was/fue', 'is/es', 'are/son', 'were/fueron'], answer: 'are/son' },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(4);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [mood, setMood] = useState<'neutral' | 'happy' | 'sad'>('neutral');

  const totalQuestions = questions.length;
  const requiredScore = 6;

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
    setLives(4);
    setSelectedOption(null);
    setShowResult(false);
    setIsVictory(false);
    setMood('neutral');
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
            <h2
              className="text-2xl font-bold mb-8"
              dangerouslySetInnerHTML={{ __html: questions[currentQuestion].question }}
            />
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
              <div className="bg-blue-500 h-6 text-white flex items-center justify-center" style={{ width: `${correctPercentage}%` }}>
                {correctPercentage}%
              </div>
            </div>

            <div className="mb-2 text-lg font-semibold text-red-700">{incorrectPercentage}% Incorrectas</div>
            <div className="w-full bg-red-100 rounded-full h-6 overflow-hidden">
              <div className="bg-red-500 h-6 text-white flex items-center justify-center" style={{ width: `${incorrectPercentage}%` }}>
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
