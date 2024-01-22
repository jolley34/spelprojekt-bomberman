class staticObstacle extends GameEntity {
  constructor(x: number, y: number, size: number) {
    super(assets.images.maptextures[0], x, y, size);
  }
}
class removebleObstacle extends GameEntity {
  constructor(x: number, y: number, size: number) {
    super(assets.images.maptextures[3], x, y, size);
  }
}

