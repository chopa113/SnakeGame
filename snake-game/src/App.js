import React, { useState, useEffect } from 'react';
import './App.css';
import Game from './Game';

function App() {
  const [game] = useState(new Game(10, 10));
  const [field, setField] = useState(game.getField());
  const [direction, setDirection] = useState('right');

  useEffect(() => {
    setField(game.getField());
  }, [game]);

  useEffect(() => {
    const interval = setInterval(() => {
      game.moveSnake(direction);
      game.checkIfAppleEaten();
      game.apple();
      setField([...game.getField()]);
    }, 200);

    return () => clearInterval(interval);
  }, [direction, game]);

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
                  backgroundImage: cell.image,
                  backgroundColor: cell.color,
                  width: '20px',
                  height: '20px',
                  border: '1px solid #ddd',
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
    </div>
  );
}

export default App;
