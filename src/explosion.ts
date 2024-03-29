/// <reference path="gameEntity.ts" />

class Explosion extends GameEntity {
  private timer: number;

  constructor(x: number, y: number, size: number, image: p5.Image) {
    super(image, x, y, size * 1.2);
    this.timer = 500;
    assets.images.bombs[2].reset();
    assets.images.bombs[3].reset();
  }

  public update(): void {
    this.timer -= deltaTime;

    if (this.timer <= 0) {
      this.shouldBeRemoved = true;
    }
  }
}
