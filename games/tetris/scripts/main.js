
const game = new TetrisGame('#game-canvas');
const gameScreen = new ScreenController(game);

game.tileWidth = 30;
game.tileHeight = 30;

game.tileColumns = 10;
game.tileRows = 20;

game.initial();
