/// <reference path="gameEntity.ts" />
class Bomb extends GameEntity {
  public timer: number;
  private range: number;
  private hasExploaded: boolean;

  constructor(x: number, y: number, size: number) {
    super(assets.images.bombs[0], x, y, size);
    this.timer = 200;
    this.range = 50;
    this.hasExploaded = false;
  }
  public update(): void {
    this.explosionDelay();
  }
  private explosionDelay(): void {
    if (!this.hasExploaded) {
      this.timer--;
    }
  }
  private explosion(hasExploaded: boolean) {}
}
