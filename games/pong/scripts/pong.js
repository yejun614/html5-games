
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

class PongGame extends VideoGame {
  constructor (selector) {
    super();
    
    // Get canvas elements
    this.canvas = document.querySelector(selector);
    this.context = this.canvas.getContext('2d');
    
    // Set canvas size
    this.width = 500;
    this.height = 350;
    
    // Set paddle mode
    this.mode = ['auto', 'huamn'];  // auto, human
    
    // Initial
    this.initial();
    
    // Playing
    this.play();
  }
  
  initial () {
    // Apply canvas size
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Set scores
    this.scoreA = 0;
    this.scoreB = 0;

    // Create counter
    this.counter = new Counter(this.width/2, this.height/2, 1000);

    // Create ball
    this.ball = new Ball(10);

    // Create paddles
    this.paddleA = this.newPaddle(this.mode[0]);
    this.paddleB = this.newPaddle(this.mode[1]);

    // Add keyboard event
    this.toggleKeys['Escape'] = false;
    this.setKeyboard();

    // Reset
    this.reset();

    // Ready counter
    this.counter.set(3, ['Ready', 'Game Start']);
  }
  
  newPaddle (mode) {
    if (mode === 'human') {
      return new Paddle(5, 100, this.height);
    } else if (mode === 'auto') {
      return new AutoPaddle(this.ball, 100, 5, 100, this.height);
    }
    
    // Default human
    return new Paddle(5, 100, this.height);
  }
  
  reset () {
    // Ball position
    this.ball.set(this.width/2, this.height/2, 0, 0);
    this.ball.randomDir();
    
    // Paddles position
    const margin = 20;
    
    this.paddleA.x = margin;
    this.paddleA.y = this.height/2 - 50;
    
    this.paddleB.x = this.width - margin;
    this.paddleB.y = this.height/2 - 50;
    
    // Reset game over
    this.isGameOver = false;
  }
  
  clear () {
    const ctx = this.context;
    
    // Background
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, this.width, this.height);
    
    // Middle line
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#525252';
    
    ctx.beginPath();
    ctx.moveTo(this.width/2, 0);
    ctx.lineTo(this.width/2, this.height);
    ctx.stroke();
  }
  
  draw () {
    const ctx = this.context;
    
    // Ball highlight background
    ctx.fillStyle = '#262626';
    
    if (this.ball.x < this.width/2) {
      ctx.fillRect(0, 0, this.width/2-5, this.height);
    } else {
      ctx.fillRect(this.width/2+5, 0, this.width/2, this.height);
    }
    
    // Score
    ctx.font = '40px san-serlf bold';
    ctx.fillStyle = '#525252';
    
    ctx.textAlign = 'right';
    ctx.fillText(this.scoreA, this.width/2 - 20, 40);
    ctx.textAlign = 'left';
    ctx.fillText(this.scoreB, this.width/2 + 20, 40);
  }
  
  collision () {
    // Get position
    const x = this.ball.x;
    const y = this.ball.y;
    
    // Canvas outline
    if (x < 0) {
      this.scoreB ++;
      return true;
    }
    if (x > this.width) {
      this.scoreA ++;
      return true;
    }
    
    // Top or Bottom collision
    if (y < 0 || y > this.height) this.ball.flip(false, true);
    
    // Paddle (A)
    if (this.paddleA.collisionWith(x, y))  {
      this.ball.x += 1;
      this.ball.flip(true, false);
    }
    // Paddle (B)
    if (this.paddleB.collisionWith(x, y))  {
      this.ball.x -= 1;
      this.ball.flip(true, false);
    }
    
    // No collision
    return false;
  }
  
  update (frame) {
    // Keyboard
    this.keyboard();
    
    // Pause
    if (this.state === "stop") {
      return;
    }
    
    // Clear canvas
    this.clear();

    // Counter
    if (this.counter.isActive) {
      // Update & Draw
      this.counter.update(frame);
      this.counter.draw(this.context);
      
      // Next frame
      return;
    }
    
    // Check GameOver
    if (this.isGameOver) {
      this.reset();  // Reset
    }
    
    // AutoPaddle update
    if (this.mode[0] === 'auto') this.paddleA.update(frame);
    if (this.mode[1] === 'auto') this.paddleB.update(frame);
    
    // Draw
    this.draw();
    
    // Draw: paddles
    this.paddleA.draw(this.context);
    this.paddleB.draw(this.context);
    
    // Draw: ball
    this.ball.update();
    this.ball.draw(this.context);
    
    // Check collision
    if (this.collision()) {
      // Set GameOver flag
      this.isGameOver = true;
      
      // Counting
      this.counter.set(3);
    }
  }
  
  play () {
    // Animate
    this.animate(frame => this.update(frame));
  }
  
  pause () {
    // Draw pause icon
    const ctx = this.context;
    
    // Draw
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(this.width/2-19, this.height/2-19, 40, 40);
    
    ctx.fillStyle = '#000000';
    ctx.fillRect(this.width/2-7, this.height/2-10, 5, 20);
    ctx.fillRect(this.width/2+5, this.height/2-10, 5, 20);
    
    // Stop
    this.state = 'stop';
  }
  
  keyboard () {
    // PAUSE
    if (this.toggleKeys['Escape']) {
      if (this.state === "play") {
        this.pause();
      } else {
        this.play();
      }
      
      // Toggle
      this.toggleKeys['Escape'] = false;
    }
    
    // Check play state
    if (this.state !== "play") return;
    
    // Paddle A
    if (this.keys['KeyW']) { this.paddleA.up(); }
    else if (this.keys['KeyS']) { this.paddleA.down(); }
    
    // Paddle B
    if (this.keys['ArrowUp']) { this.paddleB.up(); }
    else if (this.keys['ArrowDown']) { this.paddleB.down(); }
  }
}

