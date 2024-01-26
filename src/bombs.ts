/// <reference path="gameEntity.ts" />



class Bomb extends GameEntity {
  private timer: number;
  private explosionRange: number;
  public bombExploded: boolean;
  private displayBombExplosion: number;
  private isBombVisible: boolean;

  constructor(x: number, y: number, size: number) {
    super(assets.images.bombs[2], x, y, size);
    this.timer = 3000;
    this.explosionRangerange = 3;
    this.bombExploded = false;
    this.displayBombExplosion = 250;
    this.isBombVisible = true;
  }

  public update() {
    if (this.timer > 0) {
      this.timer -=deltaTime;
      if (this.timer <= 0) {
        this.exploded();
      }
    }
    

    if (this.bombExploded && this.displayBombExplosion >0 ) {
      this.displayBombExplosion -= deltaTime;
      if (this.displayBombExplosion <= 0) {
        this.image = assets.images.bombs[2];
      }
    }
  }
  private exploded() {
    this.bombExploded = true;
    this.image = assets.images.bombs[2];
    this.isBombVisible = false;
  }
  public draw() {
    if (this.isBombVisible && this.image) {
      super.draw();
    }
  }
}
