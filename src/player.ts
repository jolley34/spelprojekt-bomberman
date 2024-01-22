/// <reference path="gameEntity.ts" />

class Player extends GameEntity {
  public speedX: number;
  public speedY: number;

  constructor(x: number, y: number, size: number) {
    super(assets.images.playeranimations[0], x, y, size);
    this.speedX = 0;
    this.speedY = 0;
  }

  public update(): void {
    // Sätter hastigheten utifrån vad spelar trycker på för knapp
    if (keyIsDown(LEFT_ARROW)) {
      this.speedX = -4;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.speedX = 4;
    } else if (keyIsDown(UP_ARROW)) {
      this.speedY = -4;
    } else if (keyIsDown(DOWN_ARROW)) {
      this.speedY = 4;
    } else if (!keyIsPressed) {
      this.speedX = 0;
      this.speedY = 0;
    }

    // Ändra position utifrån hastighet
    this.x += this.speedX;
    this.y += this.speedY;
  }
}
