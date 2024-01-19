class GameBoard {
  private clouds: Clouds;
  private entities: GameEntity[];
  // Define numbers array

  constructor(entities: GameEntity[]) {
    this.clouds = new Clouds();
    this.entities = entities;
  }

  public update() {
    // Loop over all entities and update them
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].update();
    }

    // for (const entity of this.entities) {
    //   entity.update();
    // }
  }

  // Define blockSize
  public draw() {
    background(assets.images.background);

    // Loop over all entities and draw them
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].draw();
    }

    this.clouds.draw();
  }
}

// const entitet = new Obstacle(0,0,10);
// if (entitet instanceof Obstacle) {
//   // reagera baserat på att entiteten är ett hinder...
// }
