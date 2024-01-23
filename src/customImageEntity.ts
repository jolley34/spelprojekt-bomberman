///<reference path="gameEntity.ts" />

class CustomImageEntity extends GameEntity {
  constructor(x: number, y: number, size: number) {
    super(assets.images.maptextures[7], x, y, size);
  }
}
