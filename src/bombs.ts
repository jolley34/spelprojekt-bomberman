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
      this.explosionTimer--;
      for (let xOffset = -this.range; xOffset <= this.range; xOffset += 25) {
        const explosionImage = assets.images.bombs[3];
        const explosion = new GameEntity(
          explosionImage,
          this.x + xOffset,
          this.y,
          25
        );
        gameBoard.addEntity(explosion);
      }
      for (let yOffset = -this.range; yOffset <= this.range; yOffset += 25) {
        if (yOffset !== 0) {
          const explosionImage = assets.images.bombs[3];
          const explosion = new GameEntity(
            explosionImage,
            this.x,
            this.y + yOffset,
            25
          );
          gameBoard.addEntity(explosion);
        }
      }
    }
  }
}
