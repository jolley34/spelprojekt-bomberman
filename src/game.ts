class Game {
  private gameboard: Gameboard;

  constructor() {
    this.gameboard = new Gameboard();
  }

  public update() {
    // this.gameboard.update();
  }

  public draw() {
    this.gameboard.draw();
  }
}
