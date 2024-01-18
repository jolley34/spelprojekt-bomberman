/// <reference path="gameEntity.ts" />

class Player extends GameEntity {
  public speed: number;
  public blockSize: number;

  constructor(x: number, y: number, blockSize: number) {
    super(x, y);
    this.speed = 7;
    this.blockSize = blockSize;
  }

  public update(): void {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    } else if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed;
    } else if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed;
    }
  }

  public draw(): void {
    fill(255, 0, 0);
    rect(this.x, this.y, this.blockSize, this.blockSize);
  }
}
