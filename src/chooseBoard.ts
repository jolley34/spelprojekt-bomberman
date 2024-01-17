class ChooseBoard {
  private image: p5.Image;
  private gardenBoard: p5.Image;
  private iceBoard: p5.Image;
  private game: IGamePage;

  constructor(game: IGamePage) {
    this.image = loadImage("../assets/background/Map1 - blurred.png");
    this.gardenBoard = loadImage(
      "../assets/background/startingPage_background.png"
    ); //  Change the image for the garden board
    this.iceBoard = loadImage("../assets/background/cruel_nature_bg1.png"); //  Change the image for the ice board
    this.game = game;
  }

  public chooseGardenBoard() {
    //this.game = new Game(this.gardenBoard);
  }

  public chooseIceBoard() {
    //this.game = new Game(this.iceBoard);
  }
}
