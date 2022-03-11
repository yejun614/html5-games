
class Display {
  constructor (game, selector) {
    this.game = game;

    this.display = document.querySelector(selector);
    this.score = this.display.children[0];
    this.status = this.display.children[1];

    this.initial();

    window.requestAnimationFrame(frame => this.update(frame));
  }

  initial () {
    // Set width
    this.display.style.width = `${this.game.canvas.width}px`;
  }

  update (frame) {
    this.score.innerHTML = game.score;

    if (this.game.isGameOver) {
      this.status.innerHTML = 'game over';
    } else if (this.game.toggleKeys['Escape']) {
      this.status.innerHTML = 'pause';
    } else {
      this.status.innerHTML = 'playing';
    }

    window.requestAnimationFrame(frame => this.update(frame));
  }
}

