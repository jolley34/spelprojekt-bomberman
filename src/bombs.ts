/// <reference path="gameEntity.ts" />
class Bomb extends GameEntity {
  private timer: number;
  private range: number;
  private hasExploaded: boolean;

  constructor(x: number, y: number, size: number) {
    super(assets.images.bombs[0], x, y, size);
    this.timer = 300;
    this.range = 50;
    this.hasExploaded = true;
  }
  public update(): void {
    this.explosionDelay();
  }
  private explosionDelay(): void {
    if (!this.hasExploaded) {
      this.timer--;
    }
    if (this.timer <= 0) {
      this.explosion(this.hasExploaded);
    }
  }
  private explosion(hasExploaded: boolean) {}
}
