class EndOfGame {
  private game: IGamePage;
  private isVisible: boolean;
  private displayWinner: string;
  private displayScore: number;
  private icon: p5.Image;
  private quitButton: Button;
  private playAgainButton: Button;

  constructor(game: IGamePage) {
    this.game = game;
    this.isVisible = false;
    this.displayWinner = "Player 1";
    this.displayScore = 5000;
    this.icon = assets.images.entities[2];
    // Todo: Choose the right position fot the buttons
    this.quitButton = new Button(
      width / 2 - 120,
      height / 2 + 100,
      170,
      50,
      "QUIT",
      "#5A7885",
      "white"
    );
    this.playAgainButton = new Button(
      width / 2 + 120,
      height / 2 + 100,
      170,
      50,
      "PLAY AGAIN",
      "#5A7885",
      "white"
    );
  }

  public show() {
    this.isVisible = true;
  }

  public draw() {
    if (!this.isVisible) return;

    this.drawEndGameBanner();
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
    rect(width / 2 + padding, height / 2, 550, 400, 10);
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 0;
    drawingContext.shadowColor = "black";
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 20;
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = "black";

    const circleCenterX = width / 2 + 200;
    const circleCenterY = height / 2 - 110;

    // Draw player icon
    const circleDiameter = 100;
    fill("#AECDDB");
    circle(circleCenterX, circleCenterY, circleDiameter);
    imageMode(CENTER);
    image(
      this.icon,
      circleCenterX,
      circleCenterY,
      circleDiameter - 20,
      circleDiameter - 20
    );

    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 0;
    drawingContext.shadowColor = "black";

    fill(255);
    textSize(50);
    textAlign(CENTER, CENTER);
    text("WINNER", width / 2 + padding, height / 2 - 120);
    textSize(40);
    text(this.displayWinner, width / 2 + padding, height / 2 - 70);
    text(`SCORE: ${this.displayScore}`, width / 2 + padding, height / 2 - 20);
    pop();

    this.quitButton.draw();
    this.playAgainButton.draw();
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
