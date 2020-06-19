import React from 'react';

const GameStart = ({startGame, setStartGame, setSpeed, gameId}) => {
  const start = () => {
    setStartGame(false);
    setSpeed(150);
  };
  return (
    <div className={startGame ? 'startGame' : 'onGame'}>
      <h1>
        <span className={'food'}></span>
        Snake
        <span className={'food'}></span>
      </h1>
      <h3>Waiting for other player to join</h3>
      <p>Your game id is {gameId}</p>
    </div>
  );
};

export default GameStart;
