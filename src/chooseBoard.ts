class ChooseBoard {
  private image: p5.Image;
  private gardenBoard: p5.Image;
  private iceBoard: p5.Image;
  private game: Game;
  private gardenBoardButton: Button;
  private iceBoardButton: Button;

  constructor(game: Game) {
    this.image = loadImage("../assets/background/Controls.svg");
    this.gardenBoard = loadImage("../assets/background/cruel_nature_bg1.png"); //  use the appropriate image for the garden board
    this.iceBoard = loadImage("../assets/background/winter_background.png"); //  use the appropriate image for the ice board
    this.game = game;
    this.gardenBoardButton = new Button(
      width / 4 + 130,
      height / 2 + 270,
      250,
      50,
      "Garden Board"
    );
    this.iceBoardButton = new Button(
      width / 4 + width / 2 - 130,
      height / 2 + 270,
      250,
      50,
      "Ice Board"
    );
  }

  public update() {
    if (this.gardenBoardButton.isButtonPressed()) {
      this.handleGardenBoardSelection();
    }

    if (this.iceBoardButton.isButtonPressed()) {
      this.handleIceBoardSelection();
    }
  }

  private handleGardenBoardSelection() {
    const gardenBoardNumber = this.chooseGardenBoard();
    this.game.changePage("GameBoard", gardenBoardNumber); // Update this to your actual game board page
  }

  private handleIceBoardSelection() {
    const iceBoardNumber = this.chooseIceBoard();
    this.game.changePage("GameBoard", iceBoardNumber); // Update this to your actual game board page
  }

  public chooseGardenBoard() {
    return 1; // Return the number of the garden board
  }

  public chooseIceBoard(): number {
    return 2; // Return the number of the ice board
  }

  public draw() {
    drawBackgroundImage(assets.images.backgroundImages[0], 150);
    push();
    textSize(64);
    const padding = 100;
    const rectHeight = 100;
    const offsetY = 140;
    const rectWidth = textWidth("Cruel Nature") + padding * 2;

    const rectX = width / 2 - rectWidth / 2;
    const rectY = height / 4 - rectHeight / 2 - offsetY;

    fill(0);
    noStroke();
    rect(rectX, rectY, rectWidth, rectHeight, 10);

    fill("#B3D917");
    textAlign(CENTER, CENTER);
    textFont("Minecraft");
    text("Cruel Nature", width / 2, height / 4 - offsetY);
    pop();

    image(this.image, width / 4, height / 4, width / 2, height / 2);

    this.gardenBoardButton.draw();
    this.iceBoardButton.draw();
  }
}
