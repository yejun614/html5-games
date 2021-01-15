
class ScreenController {
  constructor (game) {
    this.game = game;
    this.animateContoller = null;
    
    // initial
    this.initial();
    
    // Animate
    this.animate();
  }
  
  initial () {
    // Get elements
    this.score = document.getElementById('score');
    this.playtime = document.getElementById('playtime');
    this.status = document.getElementById('status');
    
    // playtime
    this.gameTime = 0;
    this.timestamp = null;
    this.isGameOver = false;
  }
  
  animate () {
    this.animateContoller = window.requestAnimationFrame(frame => this.update(frame));
  }
  
  clear () {
    this.isGameOver = false;
    this.gameTime = 0;
    this.timestamp = null;
  }
  
  update (frame) {
    // Check flag and clear
    if (this.game.status === 'restart' || (this.isGameOver && this.game.status === 'play'))
      this.clear();
    
    // Set timestamp
    if (this.timestamp == null)
      this.timestamp = frame;
    
    if (this.game.status === 'play' && frame - this.timestamp > 1000) {
      this.gameTime ++;         // Counting play time
      this.timestamp = frame;   // Set timestamp
    }
    
    // Update
    this.score.innerHTML = this.game.score;
    this.playtime.innerHTML = this.gameTime + ' Sec';
    this.status.innerHTML = '';
    
    // Check game status
    if (this.game.status === 'stop') {
      this.status.innerHTML = 'STOPPING';
      
    } else if (this.game.status === 'gameover') {
      this.status.innerHTML = 'Game Over!<br />Press ESC key restart the game.';
      
      // Set gameover flag
      this.isGameOver = true;
    }
    
    // Next frame
    this.animate();
  }
}
