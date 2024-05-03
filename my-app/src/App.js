import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeveloperView from './DeveloperView';
import React, { useState, useEffect } from 'react';

function App() {
  const [question, setQuestion] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userSelection, setUserSelection] = useState(null);
  const [gameState, setGameState] = useState('playing'); 
  const [points, setPoints] = useState(0); 
  const [devViewVisible, setDevViewVisible] = useState(false);

  const randomId = Math.floor(Math.random() * 30) + 1;

  useEffect(() => {
    fetchQuestionById(randomId);
  }, []);

  const fetchQuestionById = async (questionId) => {
    try {
      const response = await fetch(`http://localhost:8081/${questionId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch question');
      }
      const data = await response.json();
      setQuestion(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching question:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleHigher = async () => {
    setUserSelection(true);
    checkAnswer(true);
  };

  const handleLower = () => {
    setUserSelection(false);
    checkAnswer(false);
  };

  const checkAnswer = (userChoice) => {
    if (userChoice === question.answer) {
      setPoints(points + 5);
      fetchNewQuestion();
    } else {
      setPoints(0);
      setGameState('lost');
    }
  };

  const fetchNewQuestion = () => {
    let newRandomId;
    do {
      newRandomId = Math.floor(Math.random() * 30) + 1;
    } while (newRandomId === randomId);
    fetchQuestionById(newRandomId);
  };

  const handleRestart = () => {
    setGameState('playing');
    setUserSelection(null);
    fetchNewQuestion();
  };

  const handleDeveloperView = () => {
    setDevViewVisible(true);
    setGameState('dev');
  };

  const handleCloseDeveloperView = () => {
    setDevViewVisible(false);
    setGameState('playing');
  };


  return (
    <div className="App">
      <header className="App-header" style={{ fontFamily: 'Jersey 10, sans-serif' }}>
        <h1 className="display-4 mb-4" style={{ fontFamily: 'Jersey 10, sans-serif' }}>TV Shows : Higher or Lower</h1>
        {loading ? (
          <p className="lead">Loading...</p>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            Error: {error}
          </div>
        ) : gameState === 'playing' ? (
          <div>
            <div className="row">
              <div className="col-md-6">
                <img src={question.imageUrls[0]} alt="Image 1" className="img-fluid mb-4 rounded" style={{ width: '100%', height: 'auto' }} />
              </div>
              <div className="col-md-6">
                <img src={question.imageUrls[1]} alt="Image 2" className="img-fluid mb-4 rounded" style={{ width: '100%', height: 'auto' }} />
              </div>
            </div>
            <h2 className="mb-3">{question.text}</h2>
            <div className="text-center">
              <button className="btn btn-success px-5 py-3 green-button" onClick={handleHigher} style={{ marginRight: '10px', fontSize: '40px' }}>Higher ↑</button>
              <button className="btn btn-danger px-5 py-3 red-button" onClick={handleLower} style={{ fontSize: '40px' }}>Lower ↓</button>
            </div>
            <div className="points-display">Points: <span className="points-num">{points}</span></div>
            <h2 className="mb-3">{question.text2}</h2>
            <button className="btn btn-secondary developer-view-btn" onClick={handleDeveloperView}>Developer View</button>
          </div>
        ) : gameState === 'lost' ? (
          <div className="text-center">
            <h2 className="mb-3">Sorry! You lost!</h2>
            <div className="points-display">Points: <span className="points-num">{points}</span></div>
            <button className="btn btn-primary px-4 py-2" onClick={handleRestart}>Restart</button>
          </div>
        ) : (
          null
        )}
        {gameState === 'dev' && (
          <div className="text-center">
            <h2 className="mb-3">Developer View</h2>
            {devViewVisible && <DeveloperView onClose={handleCloseDeveloperView} />}
            <button className="btn btn-danger px-4 py-2 red-button" onClick={handleRestart} style={{ position: 'fixed', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>Close</button>
          </div>
        )}
        <div className="points-display" style={{ position: 'fixed', bottom: '10px', right: '100px' }}>
        </div>
      </header>
    </div>
  );
}

export default App;
