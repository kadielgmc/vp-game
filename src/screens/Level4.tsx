import React, { useState, useEffect } from 'react';
import LivesDisplay from '../components/LivesDisplay';
import ProgressBar from '../components/ProgressBar';
import Logo from '../components/Logo';
import Confetti from 'react-confetti';

interface Level4Props {
  onVictory: () => void;
  onGameOver: () => void;
}

const Level4: React.FC<Level4Props> = ({ onVictory, onGameOver }) => {
  const questions = [
    { question: 'El edificio fue construido hace cien años.', answer: 'The building was built a hundred years ago.' },
    { question: 'Los libros fueron leídos por los estudiantes.', answer: 'The books were read by the students.' },
    { question: 'La canción fue cantada por el coro.', answer: 'The song was sung by the choir.' },
    { question: 'Las tareas fueron completadas antes de la fecha límite.', answer: 'The assignments were completed before the deadline.' },
    { question: 'La carta fue enviada la semana pasada.', answer: 'The letter was sent last week.' },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [lives, setLives] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [mood, setMood] = useState<'neutral' | 'happy' | 'sad'>('neutral');
  const totalQuestions = questions.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleGameOver();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (lives <= 0) {
      handleGameOver();
    }
  }, [lives]);

  const handleSubmit = () => {
    if (userAnswer.trim().toLowerCase() === questions[currentQuestion].answer.toLowerCase()) {
      setScore(prev => prev + 1);
      setMood('happy');
      setTimeout(() => setMood('neutral'), 1000);

      if (currentQuestion + 1 === totalQuestions) {
        onVictory();
      } else {
        setCurrentQuestion(prev => prev + 1);
        setUserAnswer('');
      }
    } else {
      setLives(prev => prev - 1);
    }
  };

  const handleGameOver = () => {
    onGameOver();
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6 relative">
      <Logo mood={mood} />

      <div className="flex justify-between items-center w-full max-w-2xl mt-8">
        <LivesDisplay lives={lives} />
        <div className="flex items-center space-x-2 text-lg">
          <span>🎯</span>
          <span>{score}/{totalQuestions}</span>
        </div>
      </div>

      <ProgressBar current={currentQuestion + 1} total={totalQuestions} />

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl text-center mt-6">
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
        <div className="text-lg text-red-600">⏳ Tiempo restante: {formatTime(timeLeft)}</div>
      </div>
    </div>
  );
};

export default Level4;
