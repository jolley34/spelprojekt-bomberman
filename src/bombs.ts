/// <reference path="gameEntity.ts" />
class Bomb extends GameEntity {
  private timer: number;
  private range: number;

  constructor(x: number, y: number, size: number) {
    super(assets.images.bombs[2], x, y, size);
    this.timer = 3000;
    this.range = 50;
  }
}
