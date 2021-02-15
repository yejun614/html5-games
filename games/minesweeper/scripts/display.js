
class GameDisplay {
  constructor (game, selector, message) {
    // Get game instance
    this.game = game;

    // Get elements
    this.displayEl = document.querySelector(selector);
    this.messageLabel = document.querySelector(message);

    // Get children
    this.countLabel = this.displayEl.querySelector('.count');
    this.restartBtn = this.displayEl.querySelector('.restart');
    this.playtimeLabel = this.displayEl.querySelector('.playtime');

    // Set event to Restart button
    this.restartBtn.addEventListener('click', () => initialGame());

    // Animation
    this.animation = null;
    this.timestamp = null;

    // Initial
    this.initial();
  }

  initial () {
    // Set message
    this.messageLabel.innerHTML = 'Mine Sweeper';

    // Playtime
    this.playtime = 0;

    // Start animation frame
    this.animation = window.requestAnimationFrame(frame => this.update(frame));
  }

  printWithZeros (num, zeros) {
    let result = num.toString();

    zeros -= result.length;
    while (zeros > 0) {
      result = "0" + result;

      zeros --;
    }

    return result;
  }

  update (frame) {
    // Check GameOver
    if (this.game.isGameOver) {
      // Message
      if (this.game.isWon) {
        this.messageLabel.innerHTML = 'Congratulations!';
      } else {
        this.messageLabel.innerHTML = 'You lost.';
      }

      // Stop animation frame
      window.cancelAnimationFrame(this.animation);

      return;
    }

    // Count Label
    let count = this.game.count - this.game.flagCount;
    if (count < 0) count = 0;

    this.countLabel.innerHTML = this.printWithZeros(count, 3);

    // Playtime
    if (this.timestamp == null) this.timestamp = frame;
    if (frame - this.timestamp >= 1000) {
      this.playtime ++;

      this.timestamp = frame;
    }

    // Playtime Label
    this.playtimeLabel.innerHTML = this.printWithZeros(this.playtime, 3);

    // Next animation frame
    this.animation = window.requestAnimationFrame(frame => this.update(frame));
  }
}

