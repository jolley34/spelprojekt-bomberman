type Controls = {
  up: number;
  left: number;
  down: number;
  right: number;
  placeBomb: number; // Custom bomb mode switch
};



class Player {
  private color: string;
  public x: number;
  public y: number;
  private size: number;
  private controls: Controls;
  private bombs: Bomb[] = [];
  private maxBombs: number = 40; // The maximum number of bombs that can be placed
  private placedBomb: Bomb | null;

  constructor(color: string, x: number, y: number, controls: Controls) {
    this.color = color;
    this.y = y;
    this.x = x;
    this.size = 50;
    this.controls = controls;
    this.placedBomb = null;
  }

  public getX() {
    return this.x;
  }

  public getY() {
    return this.y;
  }

  public getSize() {
    return this.size;
  }

  public setX(newX: number) {
    this.x = newX;
  }

  public setY(newY: number) {
    this.y = newY;
  }

  public update() {
    this.move();
  }

  private move() {
      // Player 1 controls
      if (keyIsDown(player1.controls.up) && this.y > 0) {
        this.y -= 10;
      }
      if (keyIsDown(player1.controls.down) && this.y < windowHeight) {
        this.y += 10;
      }
      if (keyIsDown(player1.controls.left) && this.x > 0) {
        this.x -= 10;
      }
      if (keyIsDown(player1.controls.right) && this.x < windowWidth) {
        this.x += 10;
      }
      if (keyIsDown(player1.controls.placeBomb)) { // Bomb mode key
        this.placeBomb();
      }

      // Player 2 controls
      if (keyIsDown(player2.controls.up) && player2.y > 0) {
        player2.y -= 10;
      }
      if (keyIsDown(player2.controls.down) && player2.y < windowHeight) {
        player2.y += 10;
      }
      if (keyIsDown(player2.controls.left) && player2.x > 0) {
        player2.x -= 10;
      }
      if (keyIsDown(player2.controls.right) && player2.x < windowWidth) {
        player2.x += 10;
      }
      if (keyIsDown(player2.controls.placeBomb)) { // Bomb mode key
        player2.placeBomb();
      }
    

    this.checkCollisionWithRectangle();
    this.updateBombs();
    
  }
    

  private placeBomb() {
    if (this.bombs.length < this.maxBombs) {
      const bomb = new Bomb(this.x, this.y);
      this.bombs.push(bomb);
  
      setTimeout(() => {
        bomb.explode();
        this.bombs.splice(this.bombs.indexOf(bomb), 1); // Removing the bomb after the explosion
      }, 500000); // 10,000 milliseconds are equivalent to 10 seconds
    }
  }

  private updateBombs() {
    for (let i = this.bombs.length - 1; i >= 0; i--) {
      const bomb = this.bombs[i];
      bomb.update();
      if (bomb.shouldExplode()) {
        bomb.explode();
        this.bombs.splice(i, 1);
      }
    }
  }

  private checkCollisionWithRectangle() {
    const minX = gameboard.positionX + this.size / 2;
    const minY = gameboard.positionY + this.size / 2;
    const maxX = gameboard.positionX + gameboard.rektangleWidth - this.size / 2;
    const maxY = gameboard.positionY + gameboard.rektangleHeight - this.size / 2;

    if (this.x < minX) this.x = minX;
    if (this.x > maxX) this.x = maxX;
    if (this.y < minY) this.y = minY;
    if (this.y > maxY) this.y = maxY;
  }

  public drawPlayer() {
    push();
    fill(this.color);
    circle(this.x, this.y, this.size * 1.15);
    pop();
    for (const bomb of this.bombs) {
      bomb.drawBomb();
    }
  }
}






