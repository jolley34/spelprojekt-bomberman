/// <reference path="gameEntity.ts" />

class Bomb extends GameEntity {
  private bombTimer: number;
  private range: number;
  public ownerId: number;

  constructor(x: number, y: number, size: number, ownerId: number) {
    super(assets.images.bombs[0], x, y, size / 2.25);
    this.bombTimer = 2300;
    this.range = 50;
    this.ownerId = ownerId;
  }

  public update(gameBoard: IAddEntity): void {
    this.bombTimer -= deltaTime;

    if (this.bombTimer <= 0) {
      this.explode(gameBoard);
    }
  }
  

  private explode(gameBoard: IAddEntity) {
    this.shouldBeRemoved = true;
    this.image = assets.images.bombs[3];
    assets.playerSoundEffects.explosion.play();

    for (let xOffset = -this.range; xOffset <= this.range; xOffset += 25) {
      gameBoard.addEntity(new Explosion(this.x + xOffset, this.y, 25));
    }
    for (let yOffset = -this.range; yOffset <= this.range; yOffset += 25) {
      if (yOffset !== 0) {
        gameBoard.addEntity(new Explosion(this.x, this.y + yOffset, 25));
      }
    }
  }
}
