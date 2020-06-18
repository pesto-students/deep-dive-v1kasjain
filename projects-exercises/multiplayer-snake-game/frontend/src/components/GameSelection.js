import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Toast } from 'react-bootstrap';
import { useNavigate } from '@reach/router';
import { postApiCall } from '../services';

const GameSelection = (props) => {
  const navigate = useNavigate();
  const [playerId, setPlayerId] = useState('');
  const [gameId, setGameId] = useState('');

  const [showToast, setShowToast] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(
    () => {
      setPlayerId(props.location.state.playerId);
    },
    [props.location.state.playerId]
  );

  const joinGame = () => {
    postApiCall({ data: { gameId: gameId, gameDetails: [{ player_id:playerId, score: 0 }] }, url: '/game/update' })
      .then((result) => {
        console.log(result);
        if (result.success) {
          navigate('/gameboard', { state: { gameId: result.gameId } });
        } else {
          showToastMessage(result.error);
        }
      })
      .catch((err) => {
        console.error(err);
        showToastMessage(err.error);
      });
  };
  const startNewGame = () => {
    postApiCall({ data: { gameDetails: [{ player_id:playerId, score: 0 }] }, url: '/game/create' })
      .then((result) => {
        console.log(result);
        if (result.success) {
          navigate('/gameboard', { state: { gameId: result.gameId } });
        } else {
          showToastMessage(result.error);
        }
      })
      .catch((err) => {
        console.error(err);
        showToastMessage(err.error);
      });
  };

  const showToastMessage = (msg) => {
    setErrorMsg(msg.toUpperCase());
    setShowToast(true);
  };

  return (
    <div>
      <br/>
      <br/>
      <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
        <Toast.Body>{errorMsg}</Toast.Body>
      </Toast>

      <p>playerId : {playerId}</p>
      <p>Select Mode </p>
      <ButtonGroup aria-label="Basic example">
        {/* <Button variant="secondary">Single</Button> */}
        <Button variant="secondary">Multiplayer</Button>
      </ButtonGroup>
      <br />
      <Button onClick={startNewGame}>Start New Game</Button>
      <br />

      <p>Enter Game Id</p>
      <input value={gameId} onInput={(e) => setGameId(e.target.value)} />
      <Button variant="primary" onClick={joinGame}>
        Join Game
      </Button>
    </div>
  );
};

export default GameSelection;
