class StaticObstacle extends GameEntity {
  constructor(x: number, y: number, size: number) {
    super(assets.images.maptextures[4], x, y, size);
  }
}
class RemovebleObstacle extends GameEntity {
  constructor(x: number, y: number, size: number) {
    super(assets.images.maptextures[3], x, y, size);
  }
}
