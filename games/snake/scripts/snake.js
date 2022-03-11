
class VideoGame {
  constructor () {
    this.fps = 10;
    this.gameTimestamp = null
    
    this.animateController = null;
    
    this.state = 'play';  // play, stop
    this.updateFunc = () => {};
    
    this.keys = {};
    this.toggleKeys = {};
  }
  
  animate (callback) {
    // Set state
    this.state = 'play';
    
    // Set callback
    this.updateFunc = callback;
    
    // Start animation
    this.animateController = window.requestAnimationFrame(frame => this.updateBack(frame));
  }
  
  stop () {
    // Set state
    this.state = 'stop';
    
    // Stop animation
    window.cancelAnimationFrame(this.animateController);
  }
  
  updateBack (frame) {
    if (this.gameTimestamp == null) this.gameTimestamp = frame;
    
    if (frame - this.gameTimestamp >= this.fps) {
      // Call update function
      this.updateFunc(frame);
      
      this.gameTimestamp = frame;
    }
    
    // Next frame
    this.animateController = window.requestAnimationFrame(frame => this.updateBack(frame));
  }
  
  clearKeyboard () {
    // Remove event
    window.removeEventListener('keydown', event => this.keyDownEvent(event));
    window.removeEventListener('keyup', event => this.keyUpEvent(event));
  }
  
  setKeyboard () {
    // Add event
    window.addEventListener('keydown', event => this.keyDownEvent(event));
    window.addEventListener('keyup', event => this.keyUpEvent(event));
  }
  
  keyDownEvent (event) {
    const code = event.code;
    this.keys[code] = true;
  }
  
  keyUpEvent (event) {
    const code = event.code;
    this.keys[code] = false;
    
    // toggle
    if (this.toggleKeys[code] != undefined) {
      this.toggleKeys[code] = !this.toggleKeys[code];
    }
  }
}

class SnakeGame extends VideoGame {
  constructor (selector) {
    super()

    // Get canvas elements
    this.canvas = document.querySelector(selector);
    this.context = this.canvas.getContext('2d');

    // 1. Initial
    this.initial();

    // 2. Play
    this.play();
  }

  initial () {
    // Set canvas size
    this.canvas.width = 360;
    this.canvas.height = 240;

    // Set keyboard events
    this.clearKeyboard();
    this.setKeyboard();

    // Set escape toggle key
    this.toggleKeys['Escape'] = false;

    // Game Over Flag
    this.isGameOver = false;

    // Snake initial position (canvas center)
    const snakeX = this.canvas.width / 2 - (10 * 5);
    const snakeY = this.canvas.height / 2;

    // Snake Object (Start from 5)
    this.snake = new SnakeObject(snakeX, snakeY, 5);

    // Set score
    this.score = 0;

    // Apple Object
    this.apple = new AppleObject();
    this.moveApple();
  }

  play () {
    this.animate(frame => this.update(frame));
  }

  gameOver () {
    // Set flag
    this.isGameOver = true;

    // Debug message
    console.log('Game Over!');
  }

  moveApple () {
    this.apple.move(this.canvas.width, this.canvas.height);
  }

  collision () {
    // Get snake position
    const px = this.snake.x;
    const py = this.snake.y;

    // Apple
    if (px >= this.apple.x && px <= this.apple.x + this.apple.width &&
        py >= this.apple.y && py <= this.apple.y + this.apple.height) {
      // Increase the score
      this.score += 1;

      // Make snake body
      this.snake.makeBody(1);

      // Move apple
      this.moveApple();
    }

    // Outside
    if (px < 0 || px + this.snake.width > this.canvas.width || 
        py < 0 || py + this.snake.height > this.canvas.height) {
        // Game over
        this.gameOver();
    }

    // Snake body
    if (this.snake.isCollision) {
      // Game Over
      this.gameOver();
    }
  }

  clear () {
    const ctx = this.context;

    // Clear background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  keyboard () {
    // Move
    if (this.keys['ArrowUp']) {
      this.snake.direction(0, -1);
    } else if (this.keys['ArrowDown']) {
      this.snake.direction(0, 1);
    } else if (this.keys['ArrowLeft']) {
      this.snake.direction(-1, 0);
    } else if (this.keys['ArrowRight']) {
      this.snake.direction(1, 0);
    }
  }

  update (frame) {
    // Check Game Over
    if (this.isGameOver) {
      this.stop();

      return;
    }

    // Check pause status
    if (this.toggleKeys['Escape']) {
      // Draw pause screen
      const ctx = this.context;

      ctx.fillStyle = '#242424';
      ctx.fillRect(10, 10, 50, 50);

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(20, 15, 10, 40);
      ctx.fillRect(40, 15, 10, 40);

      return;
    }

    // Clear
    this.clear();

    // Collision check
    this.collision();

    // Keyboard event
    this.keyboard();

    // Update snake
    this.snake.update(frame);

    // Draw apple
    this.apple.draw(this.context);

    // Draw snake
    this.snake.draw(this.context);
  }
}
