class GameBoard {
  private clouds: Clouds;
  private entities: GameEntity[];
  // Define numbers array

  constructor(entities: GameEntity[]) {
    this.clouds = new Clouds();
    this.entities = entities;
  }

  // Define blockSize

  public draw() {
    background(assets.images.background);
    for (const entity of this.entities) {
      entity.draw(); // Assuming GameEntity has a draw method
    }
    // Loopa över alla entiteter och rita ut doms
    this.clouds.draw();
  }

  // drawFloor
}
