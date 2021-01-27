
const game = new TetrisGame('#game-canvas', {
  tileWidth: 30, tileHeight: 30,
  tileColumns: 10, tileRows: 20
});

const gameScreen = new ScreenController(game);
