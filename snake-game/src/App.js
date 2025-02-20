import React, { useState, useEffect } from 'react';
import './App.css';
import Game from './Game';

function App() {
  var x = 10;
  var y = 10;
  const [game] = useState(new Game(x,y));
  const [field, setField] = useState(game.getField());
  const [direction, setDirection] = useState('right');

  useEffect(() => {
    setField(game.getField());
  }, [game]);

  useEffect(() => {
    const interval = setInterval(() => {
      game.snakeDirection = direction;
      game.moveSnake();
      game.checkIfAppleEaten();
      game.apple();
      setField([...game.getField()]);
    }, 100);

    return () => clearInterval(interval);
  }, [direction, game]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          if (direction !== 'down') {
            setDirection('up');
          }
          break;
        case 'ArrowDown':
          if (direction !== 'up') {
            setDirection('down');
          }
          break;
        case 'ArrowLeft':
          if (direction !== 'right') {
            setDirection('left');
          }
          break;
        case 'ArrowRight':
          if (direction !== 'left') {
            setDirection('right');
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [direction]);

  const handleMove = (newDirection) => {
    setDirection(newDirection);
  };


  return (
    <div>
      <div className="title">
        <a href="#" className="roboto-mono">SnakeGame</a>
      </div>
      <div className="game-board">
        {field.map((row, i) => (
          <div key={i} className="row">
            {row.map((cell, j) => (
              <div
                key={j}
                className="cell"
                style={{
                  backgroundColor: cell.color,
                  width: '20px',
                  height: '20px',
                  border: '1px solid #393e46с',
                }}
              />
            ))}
          </div>
        ))}
        <div className="controls">
          <button className='button' onClick={() => handleMove('up')}>Up</button>
          <button className='button' onClick={() => handleMove('down')}>Down</button>
          <button className='button' onClick={() => handleMove('left')}>Left</button>
          <button className='button' onClick={() => handleMove('right')}>Right</button>
        </div>
      </div>
      <div className="footer">
      </div>
    </div>
  );
}

export default App;
