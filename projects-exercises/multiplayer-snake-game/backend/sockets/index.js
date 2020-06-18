

module.exports = function(io) {
  io.on('connection', (socket) => {

    // console.log('New client connected',socket.id);

    socket.emit('moved', { moved: 'moved' }); 
    socket.emit('newfood', { newfood: 'newfood' }); 
    socket.emit('newsnake', { newsnake: 'newsnake' }); 
    socket.emit('getsnakes', { getsnakes: 'getsnakes' }); 
    
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
