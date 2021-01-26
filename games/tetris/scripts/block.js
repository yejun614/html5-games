
class Block {
  constructor (tileWidth=10, tileHeight=10, shape=null) {
    if (shape == null)
      shape = getRandomShape();
    
    this.shape = shape;
    this.rotate = 0;
    
    // Set position
    this.x = 0;
    this.y = 0;
    
    // Set tile size
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
  }
  
  draw (ctx) {
    // Set stroke line height
    const line = 1;
    ctx.lineHeight = line;
    
    // Get tiles
    this.forEach((tile, y, x) => {
      // Set color
      ctx.fillStyle = blockRectColors[tile];
      ctx.strokeStyle = blockLineColors[tile];
      
      // Set position
      const px = this.x + (x * this.tileWidth);
      const py = this.y + (y * this.tileHeight);
      
      // Draw
      ctx.fillRect(px, py, this.tileWidth, this.tileHeight);
      ctx.strokeRect(px, py, this.tileWidth, this.tileHeight);
    }, true);
  }
  
  flip () {
    // New shape
    const shape = [...Array(this.width)].map(() => Array(this.height).fill(0));
    
    // Flipping
    this.forEach((tile, y, x) => shape[x][y] = tile);
    
    // Update shape
    this.shape = shape;
  }
  
  rotation (dir=1) {
    const rows = this.shape;
    const shape = new Array(this.width);
    
    for (let y=0; y<this.width; y++)
      shape[y] = new Array(this.height);
    
    for (let y=0; y<rows.length; y++) {
      const column = rows[y];
      
      // Rotate
      for (let x=0; x<column.length; x++) {
        if (dir > 0) {
          shape[x][this.height-1-y] = column[x];
        } else {
          shape[this.width-1-x][y] = column[x];
        }
      }
    }
    
    // Update shape
    this.shape = shape;
  }
  
  forEach (callback, tileCheck=false) {
    const rows = this.shape;
    
    for (let y=0; y<rows.length; y++) {
      const column = rows[y];
      
      for (let x=0; x<column.length; x++) {
        if (tileCheck && column[x] == 0) continue;
        
        callback(column[x], y, x);
      }
    }
  }
  
  get width () {
    return this.shape[0].length;
  }
  
  get height () {
    return this.shape.length;
  }
}
