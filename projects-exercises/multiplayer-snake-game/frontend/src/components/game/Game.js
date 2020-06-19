import socketIOClient from 'socket.io-client';
import { BASESERVERURL } from '../../constants';

import React, { useState, useEffect } from 'react';
import GameStart from './GameStart';
import GameOver from './GameOver';
import { useGameLoop, randomPosition, getRowsColumns, displayGrid, useInterval, displayScore } from './GameHelper';
import GameInput from './GameInput';
import { subscribeToTimer } from '../../Api';
import SnakeCanvas from '../canvas/canvas';

let socket = '';
let gameId = '';
let playerId = '';
let gameType = '';
let gameDetails = '';
let position = [{ x: 10, y: 20 }];

const Game = (props) => {
  const height = 30;
  const width = 30;
  const grid = getRowsColumns(height, width);

  const [rows, setRows] = useState(grid);
  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  const [remoteSnake, setRemoteSnake] = useState(null);
  const [food, setFood] = useState(randomPosition(width, height));
  const [direction, setDirection] = useState('right');
  const [startGame, setStartGame] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [alive, setAlive] = useState(true);
  const [score, setScore] = useState(0);
  const [timestamp, setTimestamp] = useState('no timestamp yet');

  useEffect(
    () => {
      gameId = props.location.state.gameId;
      playerId = props.location.state.playerId;
      gameType = props.location.state.gameType;
      gameDetails = props.location.state.gameDetails;

      socket = socketIOClient(BASESERVERURL);

      // initi sockets
      initSocketEvents();

      console.log('gameId', 'gameId', gameId);

      if (gameType === 'newGame') {
        emitEvent('newGameStarted', { gameId, playerId, position, gameDetails });
      }
      if (gameType === 'joinGame') {
        emitEvent('gameJoined', { gameId, playerId, position, gameDetails });
      }

      // cleanup
      return () => {
        // disconnect socket
        socket.disconnect();
      };
    },
    [props.location.state.gameId]
  );

  useEffect(
    () => {
      window.addEventListener('keydown', ({ key }) => GameInput(key, direction, setDirection));
      return () => {
        window.removeEventListener('keydown', GameInput);
      };
    },
    [direction, setDirection]
  );

  const setSnakeFoodInGrid = () => {
    const newRows = grid;
    snake.forEach((cell) => {
      newRows[cell.x][cell.y] = 'snake';
    });

    newRows[food.x][food.y] = 'food';
    setRows(newRows);
  };

  const moveSnake = () => {
    if (startGame && snake && snake.length) {
      // console.log('DIRECTION ', direction);
      const newSnake = [];
      switch (direction) {
        case 'right':
          if (snake[0].x >= width ) {
            setSpeed(null);
            setAlive(false);
            console.log('boundery right',snake[0]);
            onBoundryTouched();
          } else {
            newSnake.push({ x: snake[0].x + 1, y: snake[0].y });
          }
          break;
        case 'left':
          if (snake[0].x < 0) {
            setSpeed(null);
            setAlive(false);
            console.log('boundery left',snake[0]);
            onBoundryTouched();
          } else {
            newSnake.push({ x: snake[0].x - 1, y: snake[0].y });
          }
          break;
        case 'top':
          if (snake[0].y < 0) {
            setSpeed(null);
            setAlive(false);
            console.log('boundery top',snake[0]);
            onBoundryTouched();
          } else {
            newSnake.push({ x: snake[0].x, y: snake[0].y - 1 });
          }
          break;
        case 'bottom':
          if (snake[0].y >= height) {
            setSpeed(null);
            setAlive(false);
            console.log('boundery bottom',snake[0]);
            onBoundryTouched();
          } else {
            newSnake.push({ x: snake[0].x, y: snake[0].y + 1 });
          }
      }
      snake.forEach((cell) => {
        newSnake.push(cell);
      });

      detectCollision({ snakeHead: { x: snake[0].x, y: snake[0].y } });

      if (snake[0].x === food.x && snake[0].y === food.y) {
        //setFood(randomPosition(width, height));

        // send event when food is consumed by snake to
        emitEvent('newFood', { gameId , playerId  , gameDetails  });
      } else {
        newSnake.pop();
      }
      setScore(snake.length);
      setSnake(newSnake);
      console.log('emitplayerId', playerId);
      emitEvent('moved', { gameId, playerId, position: newSnake });
    }
  };

  const detectCollision = ({ snakeHead }) => {
    remoteSnake.map((element) => {
      if (snakeHead.x === element.x && snakeHead.y === element.y) {
        console.log("detectCollision")
        setStartGame(false);
        // TODO: game over
      }
    });
  };

  const gameResult = () => {
    // socket disconnet , , winner decide and show on screen

  };
  const onBoundryTouched = () => {
    // socket disconnet , , winner decide and show on screen
     // TODO: game over
    gameResult()
  };
  const emitEvent = (eventName, config) => {
    socket.emit(`${eventName}`, { ...config });
  };

  const initSocketEvents = () => {
    socket.on('connect', function() {
      // that.mySnake.id = socket.id;
      console.log('connect');
      socket.emit('room', gameId);
    });

    // when a new snake enter
    socket.on('newGameStarted', function({ position }) {
      console.log('newGameStarted', position);

      // TODO: we need to show message i.e waiting for other player to join
      // position :[{x:0,y:0}] , playerId , gameId
    });

    socket.on('gameJoined', function({ position, playerId: remotePlayerId, gameId, remotePosition }) {
      // console.table('gameJoined', 'position', position, 'remotePosition', remotePosition, 'gameDetails', gameDetails);

      emitEvent('newFood', { gameId });
      if (remotePlayerId === playerId) {
        setSnake(position);
        setRemoteSnake(remotePosition);
      } else {
        setSnake(remotePosition);
        setRemoteSnake(position);
      }
      setStartGame(true);
      // position , playerId , gameId
      // position :[{x:100,y:100}]
    });

    socket.on('removesnake', function(snakeId) {
      // console.log('remove ' + snakeId);
      // for (let i = 0; i < that.snakes.length; i++) {
      //   console.log(that.snakes[i].id);
      //   if (that.snakes[i].id == snakeId) {
      //     console.log('removed: ' + snakeId);
      //     that.snakes.splice(i, 1);
      //     break;
      //   }
      // }
    });

    socket.on('moved', function({ gameId, playerId: remotePlayerId, position: remoteSnake }) {
      // console.log('moved', playerId, remoteSnake[0]);
      if (remotePlayerId !== playerId) {
        setRemoteSnake(remoteSnake);
      }
    });
    
    socket.on('score', function({gameDetails:newGameDetails }) {
      // / TODO: show score
      console.log('score', newGameDetails);
      
    
      gameDetails = newGameDetails

      // let newFood = new Food();
      // newFood.x = food.x;
      // newFood.y = food.y;
      // that.food = newFood;
    });
    socket.on('newFood', function({ gameId, playerId, position: newFoodPos }) {
      // console.log('newFood------------>', newFoodPos);
      setFood(newFoodPos);
      // let newFood = new Food();
      // newFood.x = food.x;
      // newFood.y = food.y;
      // that.food = newFood;
    });
  };

  // console.log(snake);
  // useInterval(moveSnake, speed);
  //requestAnimationFrame(moveSnake);
  useGameLoop(moveSnake);

  return <SnakeCanvas snakes={[snake, remoteSnake]} food={food} />;
};

export default Game;
