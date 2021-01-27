
class TetrisGame {
  constructor (selector) {
    this.canvas = document.querySelector(selector);
    this.context = this.canvas.getContext('2d');
    
    // Frame Per Seconds
    this.fps = 500;
    this.timestamp = null;
    this.animationContoller = null;
    
    // Set canvas size (Block size: 10, 10) - 32
    this.canvas.width = 320;
    this.canvas.height = 480;  // 480, 640
    
    // Blocks
    this.blocks = new Array();
    this.current = null;
    
    this.tileColumns = this.canvas.width / 10;
    this.tileRows = this.canvas.height / 10;
    
    // Initial
    this.initial();
    this.clear();
    
    // Start
    this.animate();
  }
  
  initial () {
    // Events
    document.addEventListener('keydown', event => this.keydown(event));
  }
  
  addBlock () {
    this.current = new Block();
    this.blocks.push(this.current);
  }
  
  clear () {
    const ctx = this.context;
    
    // Set background
    ctx.fillStyle = '#080E33';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Grid
    ctx.strokeStyle = '#111E6C';
    ctx.lineHeight = 1;
    
    // Grid: Columns
    for (let p=0; p<320; p+=10) {
      ctx.beginPath();
      ctx.moveTo(p, 0);
      ctx.lineTo(p, this.canvas.height);
      ctx.stroke();
    }
    
    // Grid: Rows
    for (let p=0; p<480; p+=10) {
      ctx.beginPath();
      ctx.moveTo(0, p);
      ctx.lineTo(this.canvas.width, p);
      ctx.stroke();
    }
  }
  
  draw () {
    // Clear
    this.clear();
    
    // Update
    if (this.current == null) {
      this.addBlock();
    }
    
    if (this.current.pos.y >= this.canvas.height - (10 * this.current.height)) {
      this.current = null;
    } else {
      this.current.pos.y += 10;
    }
    
    // Draw blocks
    this.blocks.forEach(element => {
      element.draw(this.context);
    });
  }
  
  animate () {
    this.animationContoller = window.requestAnimationFrame(frame => this.update(frame));
  }
  
  update (frame) {
    document.getElementById('frame').innerHTML = frame;
    document.getElementById('timestamp').innerHTML = frame - this.timestamp;
    
    // Check FPS
    if (this.timestamp == null) this.timestamp = frame;
    if (frame - this.timestamp < this.fps){
      this.animate();
      return;
    }
    
    // Draw
    this.draw();
    
    // Next animation frame
    this.timestamp = frame;
    this.animate();
  }
  
  keydown (event) {
    if (this.current == null)
      return;
    
    const keyCode = event.keyCode;
    let pos = this.current.pos;
    
    switch (keyCode) {
      case 83:
        // Flip (s key)
        this.current.flip();
        break;
        
      case 37:
        // Left
        if (pos.x - 10 >= 0)
          pos.x -= 10;
        break;
        
      case 38:
        // Up
        break;
        
      case 39:
        // Right
        if (pos.x + 10 <= (this.canvas.width - (10 * this.current.width)))
          pos.x += 10;
        break;
        
      case 40:
        // Down
        if (pos.y + 10 <= (this.canvas.height - (10 * this.current.height)))
          pos.y += 10;
        break;
    }
    
    // Update
    this.current.pos = pos;
    this.draw();
  }
}

