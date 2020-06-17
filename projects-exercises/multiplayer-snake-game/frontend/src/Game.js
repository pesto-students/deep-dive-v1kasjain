import React, {useState, useEffect} from "react";
import GameStart from "./GameStart";
import GameOver from "./GameOver";
import { randomPosition, getRowsColumns, displayGrid, useInterval, displayScore } from "./GameHelper";
import GameInput from "./GameInput";
import { subscribeToTimer } from './Api';


const Game = () => {
  const height = 20;
  const width = 20;
  const grid = getRowsColumns(height, width);


  const [rows, setRows] = useState(grid);
  const [snake, setSnake] = useState([{x:0,y:0}]);
  const [food, setFood] = useState(randomPosition(width, height));
  const [direction, setDirection] = useState('right');
  const [startGame, setStartGame] = useState(true);
  const [speed, setSpeed] = useState(220);
  const [alive, setAlive] = useState(true);
  const [score, setScore] = useState(0);
  const [timestamp, setTimestamp] = useState('no timestamp yet');
  


  // useEffect(() => {
  //   const [body] = document.getElementsByTagName('body');
  //   handleGameInput(body);
  // }, [direction]);
  useEffect(() => {
    window.addEventListener("keydown", ({key})=>GameInput(key, direction, setDirection));
    subscribeToTimer((err, timestamp) => {
      if (err) {
        console.log(err)
      }
      setTimestamp(timestamp)
    });
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", GameInput);
    };
  },[direction, setDirection]);

  const setSnakeFoodInGrid = () => {
    const newRows = grid;
    snake.forEach(cell => {
      newRows[cell.x][cell.y] = 'snake';
    });

    newRows[food.x][food.y] = 'food';
    setRows(newRows);
  };


  const moveSnake = () => {
    if (!startGame) {
      const newSnake = [];
      switch (direction) {
        case 'right':
          if (snake[0].y + 1 >= width) {
            setSpeed(null);
            setAlive(false)
          } else {
            newSnake.push({x: snake[0].x, y: (snake[0].y + 1)});
          }
          break;
        case 'left':
          if (snake[0].y - 1  < 0) {
            setSpeed(null);
            setAlive(false)
          } else {
            newSnake.push({x: snake[0].x, y: (snake[0].y - 1)});
          }
          break;
        case 'top':
          if (snake[0].x - 1 < 0) {
            setSpeed(null);
            setAlive(false)
          } else {
            newSnake.push({x: (snake[0].x - 1 + height) % height, y: snake[0].y});
          }
          break;
        case 'bottom':
          if (snake[0].x + 1 >= height) {
            setSpeed(null);
            setAlive(false)
          } else {
            newSnake.push({x: (snake[0].x + 1) % height, y: snake[0].y})
          }
      }
      snake.forEach(cell => {
        newSnake.push(cell);
      });

      if (snake[0].x === food.x && snake[0].y === food.y) {
        setFood(randomPosition(width, height));
      } else {
        newSnake.pop();
      }
      setScore(snake.length);
      console.log(newSnake);
      setSnake(newSnake);
      setSnakeFoodInGrid();
    }

  };

  useInterval(moveSnake, speed);

  return (<div className={'mainGrid'}>
    { displayScore(score)}
    {`This is the timer value: ${timestamp}` }
    { startGame ? GameStart(startGame, setStartGame, setSpeed ) : displayGrid(rows) }
    {GameOver(alive)}
  </div>)
};

export default Game;
