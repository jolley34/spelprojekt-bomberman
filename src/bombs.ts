/// <reference path="gameEntity.ts" />
class Bomb extends GameEntity {
  constructor(x: number, y: number, size: number) {
    super(assets.images.entities[3], x, y, size);
  }
}
///test github fungerar