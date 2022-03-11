
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
  
  set (target, message=null) {
    // Set: number
    this.num = 0;
    this.target = target;
    
    // Set: message
    this.message = message;

    this.timestamp = null;    // Timestamp
    this.isActive = true;     // Activate Counter
  }
  
  draw (ctx) {
    // Check activate
    if (!this.isActive) return;
    
    // Set color and align
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    
    // Check message
    let text = '';
    
    if (this.message == null) {
      // Set font
      ctx.font = '40px san-serlf bold'
      
      // Set text
      text = this.target - this.num;
      
    } else {
      // Set font
      ctx.font = '20px san-serlf bold'
      
      // Get text
      const index = Math.floor(this.num / this.message.length);
      text = this.message[index];
    }
    
    
    // Draw text
    ctx.fillText(text, this.x, this.y);
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

