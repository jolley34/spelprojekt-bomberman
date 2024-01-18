type Controls = {
  up: number;
  left: number;
  down: number;
  right: number;
};

class Player {
  private color: string;
  public x: number;
  public y: number;
  private size: number;
  public radius: number;
  private controls: Controls;

  constructor(color: string, x: number, y: number, controls: Controls) {
    this.color = color;
    this.y = y;
    this.x = x;
    this.size = 50;
    this.radius = this.size / 2;
    this.controls = controls;
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

  public update() {
    this.move();
  }

  private move() {
    if (keyIsPressed) {
      if (keyCode === this.controls.up && this.y > 0) {
        this.y -= 10;
      }
      if (keyCode === this.controls.down && this.y < windowHeight) {
        this.y += 10;
      }
      if (keyCode === this.controls.left && this.x > 0) {
        this.x -= 10;
      }
      if (keyCode === this.controls.right && this.x < windowWidth) {
        this.x += 10;
      }
    }
    this.checkCollisionWithRectangle();
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
    circle(this.x, this.y, this.size);
    pop();
  }

// kollision mellan player1 och player 2
// Dist = p5 funktion för att räkna ut avståndent mellan positionerna

  public checkCollisionWithPlayer(player1: Player, player2: Player) {
    const distance = dist(player1.x, player1.y, player2.x, player2.y);
    const minDistance = player1.radius + player2.radius;  //minDistance= minimal distance som anses vara en kollision

    if (distance < minDistance) {
      // Kollision upptäckt, hantera den här
      console.log("KOLLISION");
    }
  }


}
