/// <reference path="gameEntity.ts" />
class Bomb extends GameEntity {
  private timer: number;
  private range: number;
  private hasExploded: boolean;
  private explosionDisplayDuration: number;

  constructor(x: number, y: number, size: number) {
    super(assets.images.bombs[3], x, y, size);
    this.timer = 5000; // 5 ثواني
    this.range = 50;
    this.hasExploded = false;
    this.explosionDisplayDuration = 500; // 500
  }

  public update() {
    if (this.timer > 0) {
      this.timer -= deltaTime;
      if (this.timer <= 0) {
        this.explode();
      }
    }

    if (this.hasExploded && this.explosionDisplayDuration > 0) {
      this.explosionDisplayDuration -= deltaTime;
      if (this.explosionDisplayDuration <= 0) {
        // 
        this.image = null; // 
      }
    }
  }

  private explode() {
    this.hasExploded = true;
    this.image = assets.images.bombs[2]; // 
    // assets.playerSoundEffects.explosion.play();
  }

  public draw() {
    if (this.image) {
      super.draw(); // 
    }
  }
}