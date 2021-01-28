
const DIR = [1, -2];

const RAND_VALUE = (arr) => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

class Ball {
  constructor (radius) {
    // Set radius
    this.radius = radius;
    
    // Set speed
    this.speed = 3;
    
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
    this.dx = RAND_VALUE(DIR) + Math.random();
    this.dy = RAND_VALUE(DIR) + Math.random();
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

