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
  }

  public drawPlayer() {
    push();
    fill(this.color);
    circle(this.x, this.y, this.size);
    pop();
  }
}
