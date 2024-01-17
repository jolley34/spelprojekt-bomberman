class Game {
  private gameBackground: GameboardBackground;

  constructor() {
    this.gameBackground = new GameboardBackground();
  }

  public preload() {}

  public update() {}

  public draw() {
    this.gameBackground.draw();
  }
}
