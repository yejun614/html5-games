class SnakeBody {
  constructor (x, y, dx, dy) {
    // Position
    this.x = x;
    this.y = y;

    // Direction
    this.dx = dx;
    this.dy = dy;

    // Size
    this.width = 10;
    this.height = 10;

    // Color
    this.color = '#ffffff';

    // Highlight
    this.isHighlight = false;

    // Previous body
    this.prev = null;
    // Next body
    this.next = null;
  }

  update () {
    // Update position
    this.x += this.dx * this.width;
    this.y += this.dy * this.height;

    if (this.next) {
      // Next body
      this.next.update();
    }

    if (this.prev) {
      // Update direction
      this.dx = this.prev.dx;
      this.dy = this.prev.dy;
    }
  }

  collision (x, y) {
    if (x == this.x && y == this.y) {
      this.isHighlight = true;
      return true;
    }

    if (this.next) {
      return this.next.collision(x, y);
    } else {
      return false;
    }
  }

  draw (ctx) {
    if (this.isHighlight) {
      ctx.fillStyle = '#3b7ccc';
    } else {
      ctx.fillStyle = this.color;
    }

    ctx.fillRect(this.x, this.y, this.width, this.height);

    if (this.next) {
      this.next.draw(ctx);
    }
  }
}

class SnakeObject {
  constructor (x, y, size) {
    // Snake speed
    this.speed = 100;

    // Set timestamp
    this.timestamp = null;

    // Snake direction (-1, 0, 1)
    this.dx = 1;
    this.dy = 0;

    // Snake body
    this.head = new SnakeBody(x, y, this.dx, this.dy);
    this.tail = this.head;

    // Snake size (length)
    this.size = size;
    this.makeBody(size);
  }

  direction (x, y) {
    if (((-1) * this.dx == x) && ((-1) * this.dy == y)) {
      return;
    }

    this.dx = x;
    this.dy = y;
  }

  makeBody (size) {
    const x = this.tail.x + ((-1) * this.dx * this.tail.width);
    const y = this.tail.y + ((-1) * this.dy * this.tail.height);

    const body = new SnakeBody(x, y, this.dx, this.dy);
    body.prev = this.tail;
    this.tail.next = body;

    this.tail = body;

    if (size > 1) {
      this.makeBody(size - 1);
    }
  }

  update (frame) {
    // Check timestamp
    if (this.timestamp == null) this.timestamp = frame;

    // Check speed
    if (frame - this.timestamp < this.speed) return;

    // Update head direction
    this.head.dx = this.dx;
    this.head.dy = this.dy;

    // Update position
    this.head.update();

    // Update timestamp
    this.timestamp = frame;
  }

  draw (ctx) {
    this.head.draw(ctx);
  }

  get isCollision () {
    if (this.head.next == null) return false;

    return this.head.next.collision(this.x, this.y);
  }

  get x () {
    return this.head.x;
  }

  get y () {
    return this.head.y;
  }

  get width () {
    return this.head.width;
  }

  get height () {
    return this.head.height;
  }
}
