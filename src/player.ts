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
  private controls: Controls;

  constructor(color: string, x: number, y: number, controls: Controls) {
    this.color = color;
    this.y = y;
    this.x = x;
    this.size = 50;
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
    circle(this.x, this.y, this.size * 1.15);
    pop();
  }
}
