
class MineSweeper {
  constructor (selector) {
    // Get canvas elements
    this.canvas = document.querySelector(selector);
    this.context = this.canvas.getContext('2d');

    // Set mouse event
    this.setMouseEvent();

    // Set animation controller
    this.animation = null

    // Set tile size
    this.tileWidth = 28;
    this.tileHeight = 28;
  }

  initial (columns, rows, count) {
    // Set board size
    this.columns = columns;
    this.rows = rows;

    // Set canvas size
    this.canvas.width = this.columns * this.tileWidth;
    this.canvas.height = this.rows * this.tileHeight;

    // Set mine count
    this.count = count;

    // Set flag count
    this.flagCount = 0;

    // Click ground count
    this.digCount = 0;

    // Clear board array
    this.board = [...Array(rows)].map(x => Array(columns).fill(0));
    this.flagBoard = [...Array(rows)].map(x => Array(columns).fill(0));

    // Hover tile
    this.hoverTileX = -1;
    this.hoverTileY = -1;

    // Game Over Flag
    this.isGameOver = false;
    this.isWon = false;

    // Play game
    this.play();
  }

  gameOver () {
    // Game Over
    this.isGameOver = true;

    // Check won or lose
    if (this.digCount + this.count == this.columns * this.rows) {
      this.isWon = true;
    }

    // Debug message
    console.log('Game Over', this.isWon ? 'Won' : 'Loss');
  }

  putMines (x, y) {
    let count = this.count;

    while (count > 0) {
      const tx = Math.floor(Math.random() * this.columns);
      const ty = Math.floor(Math.random() * this.rows);

      if (this.board[ty][tx] == 0 && tx != x && ty != y) {
        this.board[ty][tx] = -1;
        count --;
      }
    }
  }

  inRange (x, y) {
    if (x < 0 || x > this.columns-1 || y < 0 || y > this.rows-1) return false;

    return true;
  }

  getAround (x, y, callback) {
    for (let ty=-1; ty<=1; ty++) {
      for (let tx=-1; tx<=1; tx++) {
        if (!this.inRange(x+tx, y+ty)) continue;

        callback(x+tx, y+ty);
      }
    }
  }

  chord (x, y) {
    // 범위 확인
    if (!this.inRange(x, y)) return;

    // Context 객체 가져오기
    const ctx = this.context;

    // 주변 3x3 위치 확인
    this.getAround(x, y, (tx, ty) => {
      // 이미 열려있는 칸은 제외
      if (this.board[ty][tx] > 0 || this.board[ty][tx] < -1 || this.flagBoard[ty][tx] > 0) return;

      // 해당 칸 활성화
      this.flagBoard[ty][tx] = 3;

      // 일정 시간뒤 해당 칸 비활성화
      setTimeout(() => (this.flagBoard[ty][tx] = 0), 100);
    });
  }

  // (x, y) 좌표 주변에 있는 지뢰의 개수를 반환 한다.
  // 만약 주변 3x3 에 지뢰가 없는 경우 주변에 맞닿아 있는 지뢰를 찾아 반환 한다.
  // 찾은 지뢰의 개수는 게임 보드에 직접 기록한다.
  dig (x, y) {
    // Check board position range
    if (!this.inRange(x, y)) return;

    // Do not double check
    if (this.board[y][x] != 0) return;

    // Clear flag
    this.flagBoard[y][x] = 0;

    // Increase dig count
    this.digCount ++;

    // Counting mines around in the board
    let count = 0;
    this.getAround(x, y, (bx, by) => { if(this.board[by][bx] == -1) count++ });

    // Check results
    if (count == 0) {
      this.board[y][x] = -2;

      this.getAround(x, y, (nx, ny) => this.dig(nx, ny));
    } else {
      this.board[y][x] = count;
    }
  }

  putFlag (x, y) {
    // 이미 알려진 위치에는 표시를 할 수 없다.
    if (this.board[y][x] > 0 || this.board[y][x] < -1) return;

    // 이미 표시된 게 있는 확인 한다.
    if (this.flagBoard[y][x] == 0) {
      this.flagBoard[y][x] = 1;

      this.flagCount ++;

    } else if (this.flagBoard[y][x] == 1) {
      this.flagBoard[y][x] = 2;

      this.flagCount --;

    } else {
      this.flagBoard[y][x] = 0;

    }
  }

  play () {
    this.animation = window.requestAnimationFrame(frame => this.update(frame));
  }

  stop () {
    window.cancelAnimationFrame(this.animation);
  }

  clear () {
    const ctx = this.context;

    // Clear background
    ctx.fillStyle = '#54756E';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Grid
    ctx.strokeStyle = '#83C9AD';

    ctx.beginPath();
    for (let i=0; i<this.columns; i++) {
      ctx.moveTo(i * this.tileWidth, 0);
      ctx.lineTo(i * this.tileWidth, this.canvas.height);
    }

    for (let i=0; i<this.rows; i++) {
      ctx.moveTo(0, i * this.tileHeight);
      ctx.lineTo(this.canvas.width, i * this.tileHeight);
    }
    ctx.stroke();
  }

  draw () {
    const ctx = this.context;
    
    const tWidth = this.tileWidth;
    const tHeight = this.tileHeight;

    // Draw board
    this.board.forEach((columns, y) => {
      columns.forEach((el, x) => {
        if (y == this.hoverTileY && x == this.hoverTileX) {
          ctx.fillStyle = '#83C9AD';
          ctx.strokeStyle = '#6AA98E';
        } else {
          ctx.fillStyle = '#6AA98E';
          ctx.strokeStyle = '#83C9AD';
        }

        if (el == 0 || el == -1) {
          ctx.fillRect(x * tWidth, y * tHeight, tWidth, tHeight);
          ctx.strokeRect(x * tWidth, y * tHeight, tWidth, tHeight);

        } else if (el > 0) {
          ctx.fillStyle = '#83C9AD';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.font = `bold ${this.tileHeight/1.5}px monospace`;
          ctx.fillText(el, x * tWidth + tWidth/2, y * tHeight + tHeight/2);
        }
      });
    });
  }

  drawFlag () {
    const ctx = this.context;

    const tWidth = this.tileWidth;
    const tHeight = this.tileHeight;

    // Draw
    this.flagBoard.forEach((columns, y) => {
      columns.forEach((el, x) => {
        const tx = x * tWidth + tWidth/4;
        const ty = y * tHeight + tHeight/4;

        if (el == 1) {
          // Mine flag
          ctx.drawImage(IFlag.img, tx, ty, this.tileHeight/2, this.tileHeight/2);

        } else if (el == 2) {
          // Question flag
          ctx.drawImage(IHelp.img, tx, ty, this.tileHeight/2, this.tileHeight/2);

        } else if (el == 3) {
          // Chord
          ctx.fillStyle = '#628A81';
          ctx.fillRect(x * tWidth, y * tHeight, tWidth, tHeight);
        }
      });
    });
  }

  drawAllMines () {
    const ctx = this.context;
    
    const tWidth = this.tileWidth;
    const tHeight = this.tileHeight;

    // Draw board
    this.board.forEach((columns, y) => {
      columns.forEach((el, x) => {
        if (el == -1) {
          const tx = x * tWidth + tWidth/4;
          const ty = y * tHeight + tHeight/4;

          ctx.fillStyle = '#628A81';
          ctx.fillRect(x * tWidth, y * tHeight, tWidth, tHeight);
          ctx.strokeStyle = '#83C9AD';
          ctx.strokeRect(x * tWidth, y * tHeight, tWidth, tHeight);

          ctx.drawImage(IFlower.img, tx, ty, this.tileHeight/2, this.tileHeight/2);

          // Collect mine position
          if (this.flagBoard[y][x] == 1) {
            // Draw 'X'
            ctx.strokeStyle = '#ff3636';

            ctx.beginPath();
            ctx.moveTo(x * tWidth, y * tHeight);
            ctx.lineTo(x * tWidth + tWidth, y * tHeight + tHeight);
            ctx.moveTo(x * tWidth + tWidth, y * tHeight);
            ctx.lineTo(x * tWidth, y * tHeight + tHeight);
            ctx.stroke();
          }
        }
      });
    });
  }

  setMouseEvent () {
    this.canvas.addEventListener('mousemove', event => this.mouseMoveHandler(event), false);
    this.canvas.addEventListener('mousedown', event => this.mouseDownHandler(event), false);
    this.canvas.addEventListener('contextmenu', event => {event.preventDefault()}, false);
  }

  mouseMoveHandler (event) {
    // Get mouse position
    const mx = event.offsetX;
    const my = event.offsetY;

    // Set tile position
    this.hoverTileX = Math.floor(mx / this.tileWidth);
    this.hoverTileY = Math.floor(my / this.tileHeight);
  }

  mouseDownHandler (event) {
    // Get tile position
    const x = this.hoverTileX;
    const y = this.hoverTileY;

    if (event.which === 1) {
      // 마우스 좌 클릭

      // First click chance
      if (this.digCount == 0) {
        this.putMines(x, y);
      }

      // Click the Mine
      if (this.board[y][x] == -1) {
        this.gameOver();
        return;
      }

      // Dig ground
      this.dig(x, y);
    } else if (event.which === 2) {
      // 마우스 좌, 우 동시 클릭

      // Chord
      this.chord(x, y);
    } else if (event.which === 3) {
      // 마우스 우 클릭

      // Put flag
      this.putFlag(x, y);
    }
  }

  update (frame) {
    // Clear
    this.clear();

    // Draw
    this.draw();

    // Check dig count
    if (this.digCount + this.count >= this.columns * this.rows) {
      this.gameOver();
    }

    // Check Game Over
    if (this.isGameOver) {
      // Draw all mines
      this.drawAllMines();
      
      // Game Stop (Stop animation frame)
      this.stop();
      return;

    } else {
      // Draw flag
      this.drawFlag();
    }

    // Next Animation Frame
    this.play();
  }
}


