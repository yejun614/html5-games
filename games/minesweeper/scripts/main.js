
// Game Lavels
const gameLevels = {
  Beginner: { columns: 9, rows: 9, count: 10 },
  Amateur: { columns: 16, rows: 16, count: 40 },
  Professional: { columns: 30, rows: 16, count: 99 },
}

// Entry Point
const game = new MineSweeper('#game');
const display = new GameDisplay(game, '#display', '#message');

// Navigation
const navigation = new Navigation(game, display);
navigation.append(gameLevels, '#level', '#custom');
