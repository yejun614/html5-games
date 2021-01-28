
class Paddle {
  constructor (width, height) {
    this.x = 0;
    this.y = 0;
    
    this.width = width;
    this.height = height;
    
    this.speed = 20;
  }
  
  draw (ctx) {
    // Set colors
    ctx.fillStyle = '#dbdbdb';
    
    // Draw paddle
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  
  up () {
    this.y -= this.speed;
  }
  
  down () {
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

