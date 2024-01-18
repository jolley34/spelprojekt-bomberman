/// <reference path="gameEntity.ts" />

type Controls = {
  up: number;
  left: number;
  down: number;
  right: number;
};

class Player extends GameEntity {
  private color: string;
  public x: number;
  public y: number;
  private size: number;
  private controls: Controls;

  constructor(color: string, x: number, y: number, controls: Controls) {
    super(positionX, y);
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
  }

  public drawPlayer() {
    push();
    fill(this.color);
    circle(this.x, this.y, this.size * 1.15);
    pop();
  }
}
