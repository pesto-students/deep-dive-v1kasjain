module.exports = function(io) {
  io.on('connection', (socket) => {
    // console.log('New client connected',socket.id);

    socket.emit('moved', { moved: 'moved' });
    socket.emit('newfood', { newfood: 'newfood' });
    socket.emit('newsnake', { newsnake: 'newsnake' });
    socket.emit('getsnakes', { getsnakes: 'getsnakes' });

    socket.emit('newGameStarted', { 'position': [{ x: 0, y: 0 }] });

    setTimeout(() => {
      socket.emit('gameJoined', { 'position': [{ x: 100, y: 100 }] });
    }, 4000);

    socket.on('gameJoined', (d) => {
      console.log('gameJoined', d);
    });

    socket.on('newGameStarted', (d) => {
      console.log('newGameStarted', d);
    });

    socket.on('disconnect', () => {
      // console.log('Client disconnected');
    });
  });
};
