class EndOfGame {
  private game: IGamePage;
  private displayWinner: string;
  private displayScore: number;
  private title: string;

  private quitButton: Button;
  private playAgainButton: Button;

  constructor(game: IGamePage) {
    this.game = game;
    this.title = "Cruel Nature";
    // Todo: Setup the logic for displaying the winner and score
    this.displayWinner = "Player 1";
    this.displayScore = 0;

    // Todo: Choose the right position fot the buttons
    this.quitButton = new Button(
      width / 2 - 100,
      height / 2 + 100,
      170,
      50,
      "QUIT"
    );
    this.playAgainButton = new Button(
      width / 2 + 100,
      height / 2 + 100,
      170,
      50,
      "PLAY AGAIN"
    );
  }

  public draw(): void {
    Utility.drawBackgroundImage(assets.images.backgroundImages[3], 150);
    this.drawBanner();
    this.quitButton.draw();
    this.playAgainButton.draw();
    this.drawTitle();
  }

  private drawTitle(): void {
    textSize(64);
    const padding = 100;
    const rectHeight = 100;
    const offsetY = 140;
    const rectWidth = textWidth(this.title) + padding * 2;

    const rectX = width / 2 - rectWidth / 2;
    const rectY = height / 4 - rectHeight / 2 - offsetY;

    fill(0);
    noStroke();
    rect(rectX, rectY, rectWidth, rectHeight, 10);

    push();
    fill("#B3D917");
    textAlign(CENTER, CENTER);
    text(this.title, width / 2, height / 4 - offsetY);
    pop();
  }

  private drawBanner(): void {
    push();
    fill(0);
    rectMode(CENTER);
    rect(width / 2, height / 2 - 50, 500, 200, 10);

    fill("#B3D917");
    textSize(50);
    textAlign(CENTER, CENTER);
    text("WINNER", width / 2, height / 2 - 100);
    textSize(40);
    text(this.displayWinner, width / 2, height / 2 - 60);
    text(`SCORE: ${this.displayScore}`, width / 2, height / 2 - 20);
    pop();
  }

  private mousePressed(): void {
    if (this.quitButton.isButtonPressed()) {
      console.log("I quit");
      this.game.changePage("StartPage");
      // assets.music.menumusic.play();
    }
    if (this.playAgainButton.isButtonPressed()) {
      console.log("I play again");
      this.game.changePage("ChooseBoardPage");
      // assets.music.ingamemusic.play();
    }
  }

  public update(): void {
    this.mousePressed();
  }
}
