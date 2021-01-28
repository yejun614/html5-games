
class Counter {
  constructor (x, y, speed) {
    // Activate
    this.isActive = false;
    
    // Set position
    this.x = x;
    this.y = y;
    
    // Set counting speed
    this.speed = speed;
  }
  
  clear (target) {
    // Set number
    this.num = 0;
    this.target = target;

    // Set timestamp
    this.timestamp = null;
    
    // Activate
    this.isActive = true;
  }
  
  draw (ctx) {
    // Check activate
    if (!this.isActive) return;
    
    // Set font
    ctx.font = '40px san-serlf bold'
    ctx.fillStyle = '#FFFFFF';
    
    // Draw text
    const text = this.target - this.num;
    ctx.fillText(text, this.x - 10, this.y);
  }
  
  update (frame) {
    // Check activate
    if (!this.isActive) return;
    
    // Check timestamp is null
    if (this.timestamp === null) this.timestamp = frame;
    
    if (frame - this.timestamp >= this.speed) {
      // Number
      this.num ++;
      
      // Change timestamp
      this.timestamp = frame;
    }
    
    // Check target number
    if (this.num >= this.target) {
      this.isActive = false;
    }
  }
}

