/// <reference path="gameEntity.ts" />

class Bomb extends GameEntity {
  private bombTimer: number;
  public range: number;
  public ownerId: number;

  constructor(
    x: number,
    y: number,
    size: number,
    ownerId: number,
    range: number
  ) {
    super(assets.images.bombs[0], x, y, size / 2.25);
    this.bombTimer = 2300;
    this.range = range;
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

    // Middle
    gameBoard.addEntity(new Explosion(this.x, this.y, 25));

    // Right
    for (let xOffset = 0; xOffset <= this.range; xOffset++) {
      const explosion = new Explosion(this.x + xOffset * 25, this.y, 25);
      if (!this.isOkToSpawnExplosion(explosion, gameBoard.entities)) break;
      gameBoard.addEntity(explosion);
    }
    // Left
    for (let xOffset = 0; xOffset >= -this.range; xOffset--) {
      const explosion = new Explosion(this.x + xOffset * 25, this.y, 25);
      if (!this.isOkToSpawnExplosion(explosion, gameBoard.entities)) break;
      gameBoard.addEntity(explosion);
    }
    // Down
    for (let yOffset = 0; yOffset <= this.range; yOffset++) {
      const explosion = new Explosion(this.x, this.y + yOffset * 25, 25);
      if (!this.isOkToSpawnExplosion(explosion, gameBoard.entities)) break;
      gameBoard.addEntity(explosion);
    }
    // Up
    for (let yOffset = 0; yOffset >= -this.range; yOffset--) {
      const explosion = new Explosion(this.x, this.y + yOffset * 25, 25);
      if (!this.isOkToSpawnExplosion(explosion, gameBoard.entities)) break;
      gameBoard.addEntity(explosion);
    }
  }

  private isOkToSpawnExplosion(explosion: Explosion, entities: GameEntity[]) {
    const hitBox1 = explosion.getHitBox();

    for (const entity of entities) {
      const hitBox2 = entity.getHitBox();
      if (
        entity instanceof StaticObstacle &&
        hitBox1.left < hitBox2.left + hitBox2.width &&
        hitBox1.left + hitBox1.width > hitBox2.left &&
        hitBox1.top < hitBox2.top + hitBox2.height &&
        hitBox1.top + hitBox1.height > hitBox2.top
      ) {
        return false;
      }
    }

    // checks hitbox for collisions

    return true;
  }
}
