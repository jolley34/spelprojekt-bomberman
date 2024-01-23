class StaticObstacle extends GameEntity {
  constructor(x: number, y: number, size: number, textureIndex: number) {
    super(assets.images.maptextures[textureIndex], x, y, size);
  }
}
class RemovebleObstacle extends GameEntity {
  constructor(x: number, y: number, size: number, textureIndex: number) {
    super(assets.images.maptextures[textureIndex], x, y, size);
  }
}
