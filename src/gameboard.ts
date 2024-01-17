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
    // Loopa över alla entiteter och rita ut doms
    this.clouds.draw();
  }

  // drawFloor
}
