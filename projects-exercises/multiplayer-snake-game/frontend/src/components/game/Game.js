import Socket from '../../services/sockets';
import socketIOClient from 'socket.io-client';
import { baseServerUrl } from '../../constants';

import React, { useState, useEffect } from 'react';
import GameStart from './GameStart';
import GameOver from './GameOver';
import { randomPosition, getRowsColumns, displayGrid, useInterval, displayScore } from './GameHelper';
import GameInput from './GameInput';
import { subscribeToTimer } from '../../Api';
import SnakeCanvas from '../canvas/canvas';

let socket = '';

const Game = (props) => {
  const height = 20;
  const width = 20;
  const grid = getRowsColumns(height, width);

  const [rows, setRows] = useState(grid);
  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  const [food, setFood] = useState(randomPosition(width, height));
  const [direction, setDirection] = useState('right');
  const [startGame, setStartGame] = useState(true);
  const [speed, setSpeed] = useState(220);
  const [alive, setAlive] = useState(true);
  const [score, setScore] = useState(0);
  const [timestamp, setTimestamp] = useState('no timestamp yet');

  useEffect(
    () => {
      // type,gameId , gameDetails[]
      console.log(props.location.state);

      const gameType = props.location.state.gameType;
      const gameId = props.location.state.gameId;
      const gameDetails = props.location.state.gameDetails;

      let position = [{ x: 10, y: 20 }];

      console.log(gameDetails);

      socket = socketIOClient(baseServerUrl);

      // initi sockets
      initSocketEvents();

      // if (gameType === 'newGame') {
      //   socket.newGameStarted({ gameId, gameDetails, position });
      // }
      // if (gameType === 'joinGame') {
      //   socket.gameJoined({ gameId, gameDetails, position });
      // }

      // emit gamestarted event

      // cleanup
      return () => {
        // disconnect socket
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
    if (startGame) {
      // console.log('DIRECTION ', direction);
      const newSnake = [];
      switch (direction) {
        case 'right':
          if (snake[0].y + 1 >= width) {
            setSpeed(null);
            setAlive(false);
          } else {
            newSnake.push({ x: snake[0].x + 1, y: snake[0].y });
          }
          break;
        case 'left':
          if (snake[0].x - 1 < 0) {
            setSpeed(null);
            setAlive(false);
          } else {
            newSnake.push({ x: snake[0].x - 1, y: snake[0].y });
          }
          break;
        case 'top':
          if (snake[0].x - 1 < 0) {
            setSpeed(null);
            setAlive(false);
          } else {
            newSnake.push({ x: snake[0].x, y: snake[0].y - 1 });
          }
          break;
        case 'bottom':
          if (snake[0].x + 1 >= height) {
            setSpeed(null);
            setAlive(false);
          } else {
            newSnake.push({ x: snake[0].x, y: snake[0].y + 1 });
          }
      }
      snake.forEach((cell) => {
        newSnake.push(cell);
      });

      if (snake[0].x === food.x && snake[0].y === food.y) {
        setFood(randomPosition(width, height));
      } else {
        newSnake.pop();
      }
      setScore(snake.length);
      // console.log(newSnake);
      setSnake(newSnake);
      //setSnakeFoodInGrid();

      // send emit event to server 
      // playerId , gameId , pos:[newSnake]

    }
  };

  const initSocketEvents = () => {
    socket.on('connect', function() {
      // that.mySnake.id = socket.id;
      console.log('connect');
    });

    // when a new snake enter
    socket.on('newGameStarted', function(position) {
      console.log('newGameStarted',position);
      // position :[{x:0,y:0}] , playerId , gameId

    });

    socket.on('gameJoined', function({position}) {
      console.log('gameJoined',position);
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

    socket.on('moved', function({remoteSnake}) {
      console.log(remoteSnake);
      
    });

    socket.on('newfood', function(food) {
      console.log(food);
      // let newFood = new Food();
      // newFood.x = food.x;
      // newFood.y = food.y;
      // that.food = newFood;
    });
  };

  // console.log(snake);
  useInterval(moveSnake, speed);
  //requestAnimationFrame(moveSnake);

  return <SnakeCanvas snake={snake} food={food} />;
};

export default Game;
