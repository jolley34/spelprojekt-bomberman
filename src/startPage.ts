///<reference path="iGamePage.ts" />

class StartPage implements IGamePage {
  private buttons: Boolean;
  private title: string;
  private instructions: string;
  private highScore: string;
  private startButton: Button;
  private game: Game;
  private playerName: string;
  private playerScore: number;

  constructor(game: Game) {
    this.game = game;
    this.playerName = "Player 1";
    this.playerScore = 0;
    this.title = "Cruel Nature";

    this.instructions =
      "HOW TO PLAY  \n \n Lorem ipsum dolor sit amet,  sed do eiusmod \n \n tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim sint\n \n  ea commodo consequat. Duis aute irure dolor in reprehenderit in \n \n voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur\n \n Press START GAME to begin";

    this.highScore = `High Score\n${this.playerName}\n${this.playerScore}`;

    this.buttons = false;

    this.startButton = new Button(
      width / 2,
      height / 2 + 200,
      250,
      50,
      "START GAME"
    );
  }

  public changePage(page: string): void {}

  public setHighScore(playerName: string, playerScore: number): void {
    this.playerName = playerName;
    this.playerScore = playerScore;
  }

  public draw(): void {
    Utility.drawBackgroundImage(assets.images.backgroundImages[3], 150);
    this.drawTitle();
    this.drawInstructions();
    this.drawHighScore();
    this.startButton.draw();
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
    // textFont("Minecraft");
    text(this.title, width / 2, height / 4 - offsetY);
    pop();
  }
  private drawHighScore() {
    const rectPositionX = 250;
    const rectPositionY = 130;
    const rectWidth = 200;
    const rectHeight = 130;

    const padding = 2;
    const textX = rectPositionX;
    const textY = rectPositionY + padding;

    push();
    fill(0);
    strokeWeight(4);
    stroke("#B3D917");
    rectMode(CENTER);
    rect(rectPositionX, rectPositionY, rectWidth, rectHeight, 10);
    pop();

    fill("#B3D917");
    textSize(20);
    textAlign(CENTER, CENTER);
    //textFont("Minecraft");
    text(this.highScore, textX, textY);
  }

  private drawInstructions(): void {
    const rectPositionX = width / 2;
    const rectPositionY = height / 2;
    const rectWidth = width / 2;
    const rectHeight = 270;

    const padding = 10;
    const textX = rectPositionX;
    const textY = rectPositionY + padding;

    push();
    fill(0);
    noStroke();
    rectMode(CENTER);
    rect(rectPositionX, rectPositionY, rectWidth, rectHeight, 10);

    fill(255);
    textSize(16);
    // textFont("Minecraft");
    textAlign(CENTER, CENTER);
    text(this.instructions, textX, textY, rectWidth - padding * 2);
    pop();
  }

  private mousePressed(): void {
    if (this.startButton.isButtonPressed()) {
      console.log("I was pressed");
      this.game.changePage("ChooseBoardPage");
      backgroundMusicMenu();
    }
  }

  public update(): void {
    this.mousePressed();
  }
}
