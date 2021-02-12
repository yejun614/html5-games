
const DIR = [1, -1];

const RAND_VALUE = (arr) => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

class Ball {
  constructor (radius) {
    // Set radius
    this.radius = radius;
    
    // Set speed
    this.speed = 10;
    
    // Set position and direction
    this.x = 0;
    this.y = 0;
    
    this.dx = 0;
    this.dy = 0;
  }
  
  set (x, y, dx, dy) {
    // Set position and radius
    this.x = x;
    this.y = y;
    
    // Set direction
    this.dx = dx;
    this.dy = dy;
  }
  
  flip (xpos=false, ypos=false) {
    if (xpos) this.dx *= -1;
    if (ypos) this.dy *= -1;
  }
  
  randomDir () {
    // 0.4 <= dx, dy <= 0.6
    // 위의 값이 가장 이상적인 이동속도를 보인다.
    
    this.dx = Math.random();
    this.dy = Math.random();
    
    if (this.dx < 0.1) this.dx *= 10;
    if (this.dx < 0.4) this.dx += 0.3;
    if (this.dx > 0.7) this.dx -= 0.3;
    
    if (this.dy < 0.1) this.dy *= 10;
    if (this.dy < 0.4) this.dy += 0.3;
    if (this.dy > 0.7) this.dy -= 0.3;
    
    this.dx *= RAND_VALUE(DIR);
    this.dy *= RAND_VALUE(DIR);
  }
  
  draw (ctx) {
    // Set colors
    ctx.fillStyle = '#FFFFFF';  // WHITE
    
    // Draw ball
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.fill();
  }
  
  update () {
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;
  }
}

