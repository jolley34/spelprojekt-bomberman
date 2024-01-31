class EndOfGame {
  private game: IGamePage;
  private isVisible: boolean;
  private displayWinner: string;
  private icon: p5.Image;
  private quitButton: Button;
  private playAgainButton: Button;

  constructor(game: IGamePage, icon: p5.Image) {
    this.game = game;
    this.isVisible = false;
    this.displayWinner = "";
    this.icon = icon;
    // Todo: Choose the right position fot the buttons
    this.quitButton = new Button(
      width / 2 - 100,
      height / 2 + 140,
      160,
      60,
      "QUIT",
      "#5A7885",
      "white",
      "#302f2f"
    );
    this.playAgainButton = new Button(
      width / 2 + 120,
      height / 2 + 140,
      160,
      60,
      "PLAY AGAIN",
      "#5A7885",
      "white",
      "#302f2f"
    );
  }

  public show() {
    this.isVisible = true;
  }

  public draw() {
    if (!this.isVisible) return;

    this.drawEndGameBanner();
  }

  public setWinner(winner: string) {
    this.displayWinner = winner;
  }

  public setWinnerIcon(icon: p5.Image) {
    this.icon = icon;
  }

  private drawEndGameBanner() {
    const padding = 20;
    push();
    fill("#30444C");
    drawingContext.shadowOffsetX = 5;
    drawingContext.shadowOffsetY = 10;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = "black";
    noStroke();
    rectMode(CENTER);
    rect(width / 2 + padding, height / 2 - padding, 580, 420, 10);
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 0;
    drawingContext.shadowColor = "black";
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 20;
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = "black";

    textSize(100);
    fill(255);
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height / 2 - 170);

    fill(255);
    textSize(50);
    textAlign(CENTER, CENTER);

    if (
      this.displayWinner === "Time is up!" ||
      this.displayWinner === "You Both Lost!"
    ) {
      text(this.displayWinner, width / 2 + padding, height / 2 + 20);
    } else if (
      this.displayWinner === "Player 1" ||
      this.displayWinner === "Player 2"
    ) {
      const circleCenterX = width / 2 + 220;
      const circleCenterY = height / 2 - 70;

      // Draw player icon
      const circleDiameter = 100;
      const imageOffset = 55;
      fill("#AECDDB");
      circle(circleCenterX, circleCenterY, circleDiameter);
      imageMode(CENTER);
      image(
        this.icon,
        circleCenterX,
        circleCenterY,
        circleDiameter - imageOffset,
        circleDiameter - imageOffset
      );

      drawingContext.shadowOffsetX = 0;
      drawingContext.shadowOffsetY = 0;
      drawingContext.shadowBlur = 0;
      drawingContext.shadowColor = "black";

      fill(255);
      textSize(50);
      textAlign(CENTER, CENTER);
      text("WINNER", width / 2 + padding, height / 2 - 50);
      textSize(40);
      text(this.displayWinner, width / 2 + padding, height / 2 + 20);
    }
    pop();

    this.quitButton.draw();
    this.playAgainButton.draw();
  }

  private mousePressed(): void {
    if (this.quitButton.isButtonPressed()) {
      console.log("I quit");
      this.game.changePage("StartPage");
      assets.music.ingamemusic.stop();
    }
    if (this.playAgainButton.isButtonPressed()) {
      console.log("I play again");
      this.game.changePage("ChooseBoardPage");
      assets.music.ingamemusic.stop();
      //assets.music.menumusic.setVolume(0.5);
      //assets.music.menumusic.play();
    }
  }

  public update(): void {
    this.mousePressed();
  }
}
