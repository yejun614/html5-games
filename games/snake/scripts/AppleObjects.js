
class AppleObject {
  constructor () {
    // Position
    this.x = 0;
    this.y = 0;

    // Size
    this.width = 10;
    this.height = 10;
  }

  move (rx, ry) {
    this.x = Math.floor(Math.random() * rx / 10) * 10;
    this.y = Math.floor(Math.random() * ry / 10) * 10;
  }

  draw (ctx) {
    ctx.fillStyle = '#ff3333';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

