class Obstacle extends GameEntity {
  private blockSize: number;

  constructor(x: number, y: number, blockSize: number) {
    super(x, y);
    this.blockSize = blockSize;
  }

  public draw() {
    image(
      assets.images.maptextures[0],
      this.x,
      this.y,
      this.blockSize,
      this.blockSize
    );
  }
}
