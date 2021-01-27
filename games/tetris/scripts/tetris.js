
class TetrisGame {
  constructor (selector, data=null) {
    // Get canvas and 2d context
    this.canvas = document.querySelector(selector);
    this.context = this.canvas.getContext('2d');
    
    // Animation
    this.timestamp = null;
    this.animationContoller = null;
    
    // Block speed
    this.speed = 500;
    
    // Set tiles size
    this.tileWidth = 10;
    this.tileHeight = 10;
    
    // Set tiles length
    this.tileColumns = 32;
    this.tileRows = 48;
    
    this.initial(data);   // 1. Initial
    this.animate();       // 2. Start
    
    // Events
    document.addEventListener('keydown', event => this.keydown(event));
  }
  
  initial (data=null) {
    // Apply data
    if (data) {
      // Block speed
      this.speed = data.speed ? data.speed : 500;
      
      // Tiles size
      this.tileWidth = data.tileWidth ? data.tileWidth : 10;
      this.tileHeight = data.tileHeight ? data.tileHeight : 10;
      
      // Tiles length
      this.tileColumns = data.tileColumns ? data.tileColumns : 32;
      this.tileRows = data.tileRows ? data.tileRows : 48;
    }
    
    // Set score
    this.score = 0;
    
    // Set status
    this.status = 'play';  // play / stop / gameover
    
    // Set canvas size
    this.canvas.width = this.tileColumns * this.tileWidth;
    this.canvas.height = this.tileRows * this.tileHeight;
    
    // Blocks
    this.current = null;
    
    // Blocks: multi-array [tileRows][tileColumns]
    const shape = [...Array(this.tileRows)].map(() => Array(this.tileColumns).fill(0));
    this.blocks = new Block(this.tileWidth, this.tileHeight, shape);
    
    // Blocks: rows
    this.rows = Array(this.tileRows).fill(0);
  }
  
  addToBlocks () {
    // Get current block position
    const block = this.current;
    const x = Math.floor(block.x / this.tileWidth);
    const y = Math.floor(block.y / this.tileHeight);
    
    block.forEach((tile, ty, tx) => {
      // Add to stage blocks
      this.blocks.shape[y+ty][x+tx] = tile;
      
      // Counting blocks length
      this.rows[y+ty] ++;
    }, true);
    
    // Clear current block
    this.current = null;
  }
  
  isFloorCollision () {
    // Current blocks is not exist
    if (this.current == null) return false;
    
    // Get current block position
    const px = this.current.x / this.tileWidth;
    const py = this.current.y / this.tileHeight;
    
    const height = this.current.height;
    
    // Canvas floor
    if (py >= this.tileRows - this.current.height) {
      return true;
    }
    
    // Collision with other blocks
    let result = false;
    
    this.current.forEach((tile, ty, tx) => {
      if (this.blocks.shape[py+ty+1][px+tx] > 0) result = true;
    }, true);
    
    // No collision
    return result;
  }
  
  isSideCollision () {
    // Current blocks is not exist
    if (this.current == null) return false;
    
    // Get current block position
    const px = this.current.x / this.tileWidth;
    const py = this.current.y / this.tileHeight;
    
    // Canvas left side
    if (px < 0) {
      this.current.x = 0;
      return true;
    }
    
    // Canvas right side
    const right = this.tileColumns - this.current.width;
    
    if (px >= right + 1) {
      this.current.x = right * this.tileWidth;
      return true;
    }
    
    // Collision with other blocks
    let result = false;
    
    this.current.forEach((tile, ty, tx) => {
      if (tx == 0) {
        tx --;
      } else {
        tx ++;
      }
      
      if (this.blocks.shape[py+ty][px+tx] > 0) result = true;
    }, true);
    
    // No collision
    return result;
  }
  
  findAndClearFullRow () {
    // Find line
    const line = this.rows.indexOf(this.tileColumns);
    if (line < 1) return;  // Not found
    
    // Clear the line
    this.rows[line] = 0;
    
    // Boom (change color)
    this.blocks.shape[line] = Array(this.tileColumns).fill(9);
    
    // Delay (300 milliseconds)
    setTimeout(() => {
      // Block down
      this.blocks.shape.splice(line, 1);
      this.blocks.shape.unshift(Array(this.tileColumns).fill(0));
      
      // Update rows
      this.rows.splice(line, 1);
      this.rows.unshift(0);

    }, 300);

    // Score plus 100
    this.score += 100;
  }
  
  isGameOver () {
    // Check block is over the ceiling
    return this.rows[0] > 0;
  }
  
  gameOver () {
    // Debug message
    console.log('Game Over!');
    
    // Stop update
    this.stop();
    
    // Change game status
    this.status = 'gameover';
  }
  
  clear () {
    // Get context
    const ctx = this.context;
    
    // Set background
    ctx.fillStyle = '#080E33';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Grid
    ctx.strokeStyle = '#111E6C';
    ctx.lineHeight = 1;
    
    // Grid: Columns
    for (let p=0; p<(this.tileColumns * this.tileWidth); p+=this.tileWidth) {
      ctx.beginPath();
      ctx.moveTo(p, 0);
      ctx.lineTo(p, this.canvas.height);
      ctx.stroke();
    }
    
    // Grid: Rows
    for (let p=0; p<(this.tileRows * this.tileHeight); p+=this.tileHeight) {
      ctx.beginPath();
      ctx.moveTo(0, p);
      ctx.lineTo(this.canvas.width, p);
      ctx.stroke();
    }
  }
  
  draw () {
    // Clear
    this.clear();
    
    // Draw: current block
    this.current.draw(this.context);
    // Draw: blocks
    this.blocks.draw(this.context);
  }
  
  animate () {
    this.status = 'play';
    
    // Start animation frame (Start update function)
    this.animationContoller = window.requestAnimationFrame(frame => this.update(frame));
  }
  
  stop () {
    this.status = 'stop';
    
    // Stop animation frame (stop update function)
    window.cancelAnimationFrame(this.animationContoller);
  }
  
  restart () {
    // Debug message
    console.log('Restart');
    
    // Stop update
    this.stop();
    
    // Change status
    this.status = 'restart';
    
    // Delay(100 milliseconds) for 'screen.js'
    setTimeout(()=>{
      // Restart game
      this.initial();
      this.animate();
    }, 100);
  }
  
  update (frame) {
    // Debug messages
    document.getElementById('frame').innerHTML = frame;
    document.getElementById('timestamp').innerHTML = frame - this.timestamp;
    
    // Game Over check
    if (this.isGameOver()) {
      this.gameOver();
      return;
    }
    
    // Collision check
    this.isSideCollision();
    
    if (this.isFloorCollision()) {
      this.addToBlocks();
    }
    
    // Create new block
    if (this.current == null) {
      this.current = new Block(this.tileWidth, this.tileHeight);
      this.current.x = Math.floor((this.tileColumns - this.current.width) / 2) * this.tileWidth;
    }
    
    // Check frame
    if (this.timestamp == null) this.timestamp = frame;
    
    if (frame - this.timestamp >= this.speed) {
      this.current.y += this.tileHeight;   // Block down
      this.timestamp = frame;              // Set timestamp
    }
    
    // Find & Clear full row
    this.findAndClearFullRow()
    
    // Draw
    this.draw();
    
    // Next animation frame
    this.animate();
  }
  
  keydown (event) {
    if (this.current == null) return;
    
    const keyCode = event.keyCode;
    const block = this.current;
    
    switch (keyCode) {
      case 27:
        // Stop & Play (ESC key)
        if (this.status === 'play') {
          this.stop();
        } else if (this.status === 'stop') {
          this.animate();
        } else {
          this.restart();
        }
        
        break;
        
      case 82:
        // Restart (r key)
        this.restart();
        break;
        
      case 83:
        // Flip (s key)
        block.flip();
        break;
        
      case 65:
        // Rotate (a key)
        block.rotation(-1);
        break;
        
      case 68:
        // Rotate (d key)
        block.rotation();
        break;
        
      case 37:
        // Left
        if (!this.isSideCollision()) block.x -= this.tileWidth;
        break;
        
      case 38:
        // Up (speed down)
        while (!this.isFloorCollision()) {
          this.current.y += this.tileHeight;
        }
        break;
        
      case 39:
        // Right
        if (!this.isSideCollision()) block.x += this.tileWidth
        break;
        
      case 40:
        // Down
        if (!this.isFloorCollision()) block.y += this.tileHeight;
        break;
    }
  }
}

