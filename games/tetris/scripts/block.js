
const blockShapeItems = [
  'l', 'L', 'J', 'O', 'S', 'T', 'Z'
];

const blockShapes = {
  l: [
    [ 1, 1, 1, 1 ],
  ],
  L: [
    [ 1, 0, 0 ],
    [ 1, 1, 1 ],
  ],
  J: [
    [ 0, 0, 1 ],
    [ 1, 1, 1 ]
  ],
  O: [
    [ 1, 1 ],
    [ 1, 1 ],
  ],
  S: [
    [ 0, 1, 1 ],
    [ 1, 1, 0 ],
  ],
  T: [
    [ 0, 1, 0 ],
    [ 1, 1, 1 ],
  ],
  Z: [
    [ 1, 1, 0 ],
    [ 0, 1, 1 ],
  ]
};

function getRandomShape() {
  const num = Math.floor(Math.random() * 7);
  const shape = blockShapeItems[num];
  
  return blockShapes[shape];
}

class Block {
  constructor (shape=null) {
    if (shape == null)
      shape = getRandomShape();
    
    this.shape = shape;
    this.rotate = 0;
    
    this.pos = new vec2(0, 0);
    this.size = new vec2(10, 10);
  }
  
  draw (ctx) {
    // Set colors
    ctx.fillStyle = '#2039CC';
    ctx.strokeStyle = '#192DA1';
    
    // Set stroke line height
    const line = 1;
    ctx.lineHeight = line;
    
    // Draw
    const rows = this.shape;
    for (let y=0; y<rows.length; y++) {
      const column = rows[y];
      
      for (let x=0; x<column.length; x++) {
        if (column[x] == 0) continue;
        
        const px = this.pos.x + (x * this.size.x);
        const py = this.pos.y + (y * this.size.y);
        
        ctx.fillRect(px, py, this.size.x, this.size.y);
        ctx.strokeRect(px, py, this.size.x, this.size.y);
      }
    }
  }
  
  flip () {
    const rows = this.shape;
    const width = rows.length;
    const height = rows[0].length;
    
    const shape = new Array(height);
    
    for (let y=0; y<height; y++)
      shape[y] = new Array(width);
    
    for (let y=0; y<rows.length; y++) {
      const column = rows[y];
    
      // Flipping
      for (let x=0; x<column.length; x++) {
        shape[x][y] = column[x];
      }
    }
    
    // Update shape
    this.shape = shape;
  }
  
  get width () {
    return this.shape[0].length;
  }
  
  get height () {
    return this.shape.length;
  }
}
