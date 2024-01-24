/// <reference path="gameEntity.ts" />
class Bomb extends GameEntity {
  constructor(x: number, y: number, size: number) {
    super(assets.images.bombs[0], x, y, size);
  }
}
