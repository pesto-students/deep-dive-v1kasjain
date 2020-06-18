const Game = rootRequire('models').Game;
async function handler(req, res, next) {
  try {
    const game_id = req.body.gameId;
    const details = req.body.gameDetails;

    if (!game_id) throw Error('gameId not provided');
    if (!details || !details.length) throw Error('gameDetails not provided');

    const game = await Game.findOne({ game_id });

    if (!game) throw Error('gameId not found');

    game.details.push(details);

   const result =  await game.save();

    res.json({
      success: true,
      message: 'Game updated successfully',
      gameId: game.game_id
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message.includes('duplicate key error')
        ? 'gameId already exists , try different gameId'
        : error.message
    });
  }
}
module.exports = handler;
