/// <reference path="gameEntity.ts" />
class Bomb extends GameEntity {
  public bombTimer: number;
  public explosionTimer: number;
  private range: number;
  private hasExploaded: boolean;

  constructor(x: number, y: number, size: number) {
    super(assets.images.bombs[0], x, y, size);
    this.bombTimer = 200;
    this.explosionTimer = 200;
    this.range = 50;
    this.hasExploaded = false;
  }
  public update(): void {
    this.explosionDelay();
  }
  private explosionDelay(): void {
    this.bombTimer--;

    if (this.bombTimer <= 0) {
      this.explosion();
      this.hasExploaded = true;
    }
  }
  private explosion() {
    if (this.hasExploaded) {
      console.log("jag är här");
      this.image = assets.images.bombs[3];
      this.explosionTimer--;
    }
  }
}
