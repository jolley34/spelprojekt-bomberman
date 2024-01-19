/// <reference path="gameEntity.ts" />

class Player extends GameEntity {
  private speed: number;

  constructor(x: number, y: number, size: number) {
    super(assets.images.clouds[0], x, y, size);
    this.speed = 4;
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
}
