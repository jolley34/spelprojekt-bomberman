class EndOfGame {
  private game: IGamePage;
  private displayWinner: string;
  private displayScore: number;
  private backgroundImage: p5.Image;
  private quitButton: Button;
  private playAgainButton: Button;

  constructor(game: IGamePage, backgroundImage: p5.Image) {
    this.game = game;
    // Todo: Setup the logic for displaying the winner and score
    this.displayWinner = "Player 1";
    this.displayScore = 0;
    this.backgroundImage = backgroundImage;

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
