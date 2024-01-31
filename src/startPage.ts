///<reference path="iGamePage.ts" />

class StartPage implements IGamePage {
  private title: string;
  private instructions: string;
  private startButton: Button;
  private game: IGamePage;

  constructor(game: IGamePage) {
    this.game = game;
    this.title = "Cruel Nature";

    this.instructions =
      "Your  goal  is  to  navigate  through  the  lush  garden  or  the  frosty  ice,  collect  \n \nthe  power-ups,  avoid obstacles,  and  reach  the  end  before  time  runs  out.    Eliminate  your \n \n  opponent  by  placing  bombs  to  demolish  blocks  and  pave  your  path  towards  your  victory. \n\n Press  START  GAME  to begin";

    this.startButton = new Button(
      width / 2,
      height / 2 + 250,
      250,
      60,
      "START  GAME",
      "black",
      "#B3D917",
      "#302f2f"
    );
  }

  public changePage(page: string): void {}

  public draw(): void {
    Utility.drawBackgroundImage(assets.images.backgroundImages[3], 120);
    this.drawTitle();
    this.drawInstructions();
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
    text(this.title, width / 2, height / 4 - offsetY);
    pop();
  }

  private drawInstructions(): void {
    const rectPositionX = width / 2;
    const rectPositionY = height / 2;
    const rectWidth = width / 2 + 50;
    const rectHeight = 330;

    const padding = 10;
    const textX = rectPositionX;
    const textY = rectPositionY + padding;

    push();
    fill(0);
    noStroke();
    rectMode(CENTER);
    rect(rectPositionX, rectPositionY, rectWidth, rectHeight, 10);

    fill(255);
    textSize(25);
    textAlign(CENTER, CENTER);
    text("HOW TO PLAY", textX, textY - 140);
    textSize(18);
    text(this.instructions, textX, textY);
    pop();
  }

  private mousePressed(): void {
    if (this.startButton.isButtonPressed()) {
      this.game.changePage("ChooseBoardPage");
      assets.music.menumusic.setVolume(0.5);
      assets.music.menumusic.play();
    }
  }

  public update(): void {
    this.mousePressed();
  }
}
