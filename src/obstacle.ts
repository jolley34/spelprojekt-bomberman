class Obstacle extends GameEntity {
  constructor(x: number, y: number, size: number) {
    super(assets.images.maptextures[0], x, y, size);
  }
}
