
class Paddle {
  constructor (width, height, maxHeight) {
    this.x = 0;
    this.y = 0;
    
    this.width = width;
    this.height = height;
    
    this.maxHeight = maxHeight;
    
    this.speed = 10;
  }
  
  draw (ctx) {
    // Set colors
    ctx.fillStyle = '#dbdbdb';
    
    // Draw paddle
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  
  up () {
    if (this.y - this.speed >= 0)
      this.y -= this.speed;
  }
  
  down () {
    if (this.y + this.speed <= this.maxHeight - this.height)
      this.y += this.speed;
  }
  
  collisionWith(tx, ty) {
    if ((ty >= this.y && ty <= this.y + this.height) && 
        (tx >= this.x && tx <= this.x + this.width)) {
      return true;
    }
    
    // No collision
    return false;
  }
}

