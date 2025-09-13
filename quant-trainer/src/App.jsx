import { useState, useEffect } from 'react';
import { generateQuestion } from './services/questionGenerator';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('idle'); // 'idle', 'running', 'finished'
  const [timeLeft, setTimeLeft] = useState(480); // 8 minutes
  const [score, setScore] = useState(0);

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState('');

  // Timer effect
  useEffect(() => {
    if (gameState !== 'running') return;

    if (timeLeft === 0) {
      setGameState('finished');
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [gameState, timeLeft]);

  const loadNewQuestion = () => {
    setIsAnswered(false);
    setFeedback('');
    setUserAnswer('');
    setCurrentQuestion(generateQuestion());
  };

  const startTest = () => {
    setGameState('running');
    setScore(0);
    setTimeLeft(480);
    loadNewQuestion();
  };

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userAnswer.trim() === '' || isAnswered) return;

    setIsAnswered(true);
    const userAnswerNumber = parseFloat(userAnswer);

    if (userAnswerNumber === currentQuestion.answer) {
      setScore(prevScore => prevScore + 1);
      setFeedback('Correct!');
    } else {
      setFeedback(`Incorrect. The correct answer was ${currentQuestion.answer}.`);
    }

    setTimeout(() => {
      loadNewQuestion();
    }, 1000); // 1-second delay for feedback
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Quantitative Aptitude Trainer</h1>
      </header>
      <main className="App-main">
        {gameState === 'idle' && (
          <button onClick={startTest} className="start-button">Start "8 in 80" Test</button>
        )}

        {gameState === 'finished' && (
          <div className="results-container">
            <h2>Test Over!</h2>
            <p>Your final score is: {score}</p>
            <button onClick={startTest} className="start-button">Try Again</button>
          </div>
        )}

        {gameState === 'running' && currentQuestion && (
          <>
            <div className="stats-container">
              <span>Score: {score}</span>
              <span>Time Left: {formatTime(timeLeft)}</span>
            </div>
            <div className="question-container">
              <p className="question-text">{currentQuestion.question}</p>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={handleInputChange}
                  className="answer-input"
                  placeholder="Your answer"
                  disabled={isAnswered}
                  autoFocus
                />
                <button type="submit" className="submit-button" disabled={isAnswered}>
                  Submit
                </button>
              </form>
              {feedback && <p className="feedback-text">{feedback}</p>}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
