const game = new MineSweeper('#game');
const display = new GameDisplay(game, '#display', '#message');

let setting = {
  columns: 9,
  rows: 9,
  count: 10,
};

const initialGame = () => {
  const {columns, rows, count} = setting;

  game.initial(columns, rows, count);
  display.initial();
}

const changeSetting = (columns, rows, count) => {
  setting.columns = columns;
  setting.rows = rows;
  setting.count = count;

  // Game restart
  initialGame();
}

// Game start
initialGame();

// Custom
const customEl = document.getElementById('custom');
const customColumns = customEl.querySelector('input[name="columns"]');
const customRows = customEl.querySelector('input[name="rows"]');
const customCount = customEl.querySelector('input[name="count"]');

const customApply = () => {
  const columns = Number(customColumns.value);
  const rows = Number(customRows.value);
  const count = Number(customCount.value);
  
  changeSetting(columns, rows, count);
}

// Level a links
document.getElementById('level').addEventListener('click', event => {
  document.querySelector('#level a.active').classList.toggle('active');
  event.target.classList.toggle('active');

  // Custom
  if (event.target.innerHTML === 'Customize') {
    customEl.classList.add('active');
  } else {
    customEl.classList.remove('active');
  }
});
