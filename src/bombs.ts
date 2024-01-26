/// <reference path="gameEntity.ts" />

class Bomb extends GameEntity {
  private bombTimer: number;
  private range: number;

  constructor(x: number, y: number, size: number) {
    super(assets.images.bombs[0], x, y, size);
    this.bombTimer = 200;
    this.range = 50;
  }

  public update(gameBoard: IAddEntity): void {
    this.bombTimer--;

    if (this.bombTimer <= 0) {
      this.explode(gameBoard);
    }
  }

  private explode(gameBoard: IAddEntity) {
    this.shouldBeRemoved = true;
    this.image = assets.images.bombs[3];

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
