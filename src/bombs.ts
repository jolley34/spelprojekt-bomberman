/// <reference path="gameEntity.ts" />
class Bomb extends GameEntity {
  public bombTimer: number;
  public explosionTimer: number;
  private range: number;
  private hasExploaded: boolean;

  constructor(x: number, y: number, size: number) {
    super(assets.images.bombs[0], x, y, size);
    this.bombTimer = 200;
    this.explosionTimer = 50;
    this.range = 50;
    this.hasExploaded = false;
  }
  public update(gameBoard: IAddEntity): void {
    this.explosionDelay(gameBoard);
  }
  private explosionDelay(gameBoard: IAddEntity): void {
    this.bombTimer--;

    if (this.bombTimer <= 0) {
      this.explosion(gameBoard);
      this.hasExploaded = true;
    }
  }
  private explosion(gameBoard: IAddEntity) {
    if (this.hasExploaded) {
      console.log("jag är här");
      this.image = assets.images.bombs[3];

      for (let xOffset = -this.range; xOffset <= this.range; xOffset += 25) {
        gameBoard.addEntity(new Explosion(this.x + xOffset, this.y, 25));
      }
      for (let yOffset = -this.range; yOffset <= this.range; yOffset += 25) {
        if (yOffset !== 0) {
          gameBoard.addEntity(new Explosion(this.x, this.y + yOffset, 25));
        }
      }
      this.explosionTimer--;
    }
  }
}
class Explosion extends GameEntity {
  public timer: number;
  constructor(x: number, y: number, size: number) {
    super(assets.images.bombs[3], x, y, size);
    this.timer = 100;
  }
  public update() {
    this.explosionRange();
  }
  private explosionRange() {
    this.timer--;
  }
}
