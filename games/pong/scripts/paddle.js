
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

class AutoPaddle extends Paddle {
  constructor (ball, updateSpeed, width, height, maxHeight) {
    super(width, height, maxHeight);
    
    this.ball = ball;
    
    this.updateSpeed = updateSpeed;
    this.timestamp = null;
  }
  
  calculation () {
    // Get ball position
    const x = this.ball.x;
    const y = this.ball.y;
    
    const dx = this.ball.dx;
    const dy = this.ball.dy;
    
    // 이차방정식을 이용해서 공의 방향을 읽어서 움직인다.
    const edge = (dx/dy) * (x-this.x) + y;
    const relation = edge - (this.height/2);
    
    return relation;
  }
  
  update (frame) {
    if (this.timestamp == null) this.timestamp = frame;
    if (frame - this.timestamp < this.updateSpeed) return;
    
    // Check position
    const relation = this.calculation();
    
    // 움직이는 속도(speed)에서 빈틈이 나온다.
    if (relation > this.y) {
      this.down();
    } else if (relation < this.y) {
      this.up();
    }
  }
}
