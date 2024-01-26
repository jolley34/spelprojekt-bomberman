/// <reference path="gameEntity.ts" />

class Explosion extends GameEntity {
  private timer: number;

  constructor(x: number, y: number, size: number) {
    super(assets.images.bombs[3], x, y, size);
    this.timer = 100;
  }

  public update() {
    this.timer--;

    if (this.timer <= 0) {
      this.shouldBeRemoved = true;
    }
  }
}
