/// <reference path="gameEntity.ts" />

class Explosion extends GameEntity {
  private timer: number;

  constructor(x: number, y: number, size: number, image: p5.Image) {
    super(image, x, y, size);
    this.timer = 500;
  }

  public update() {
    this.timer -= deltaTime;

    if (this.timer <= 0) {
      this.shouldBeRemoved = true;
    }
  }
}
