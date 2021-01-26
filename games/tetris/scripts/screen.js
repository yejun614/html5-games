
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
  
  update (frame) {
    // Play time
    if (this.isGameOver && this.game.status === 'play') {
      this.isGameOver = false;
      this.gameTime = 0;
      this.timestamp = null;
    }
    
    if (this.timestamp == null) this.timestamp = frame;
    
    if (this.game.status === 'play' && frame - this.timestamp > 1000) {
      this.gameTime ++;
      this.timestamp = frame;
    }
    
    // Update
    this.score.innerHTML = this.game.score;
    this.playtime.innerHTML = this.gameTime + ' Sec';
    this.status.innerHTML = '';
    
    if (this.game.status === 'stop') {
      this.status.innerHTML = 'STOPPING';
      
    } else if (this.game.status === 'gameover') {
      this.status.innerHTML = 'Game Over!<br />Press ESC key restart the game.';
      
      this.isGameOver = true;
    }
    
    this.animate();
  }
}
