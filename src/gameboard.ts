class GameBoard {
  private clouds: Clouds;
  private entities: GameEntity[];

  constructor(entities: GameEntity[]) {
    this.clouds = new Clouds();
    this.entities = entities;
  }

  public setupGameBackground() {
    createCanvas(windowWidth, windowHeight);
  }

  public drawGameBackground() {
    image(assets.images.backgroundImages[0], 0, 0, width, height);
  }
  public update() {
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].update();
    }
  }

  public draw() {
    this.drawGameBackground();
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].draw();
    }
    this.clouds.draw();
  }
}
