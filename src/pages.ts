interface IGamePage {
  changePage(page: string, board?: number): void;
  draw(): void;
  update(): void;
}

// Implement the interface
class StartPage implements IGamePage {
  private startButton?: p5.Element;
  private title: string;
  private instructions: string;

  constructor() {
    this.title = "Cruel Nature!";
    this.instructions = "Press START to begin";
    this.createStartButton();
  }

  private createStartButton(): void {
    this.startButton = createButton("START GAME");
    this.startButton.position(
      windowWidth / 2 - this.startButton.width / 2,
      windowHeight / 2 - this.startButton.height / 2 + 100
    );
    this.startButton.style("padding", "10px 20px");
    this.startButton.style("font-size", "16px");
    this.startButton.style("font-family", "Minecraft");
    this.startButton.style("background-color", "black");
    this.startButton.style("color", "white");
    this.startButton.style("border", "solid white");
    this.startButton.style("border-radius", "8px");

    this.startButton.mousePressed(() => {
      console.log("I was pressed");
      this.changePage("Game");
    });
  }

  public draw(): void {
    this.drawBackground();
    this.drawTitle();
    this.drawInstructions();
  }

  private drawBackground(): void {}

  private drawTitle(): void {
    fill("255");
    textSize(64);
    textFont("Minecraft");
    textAlign(CENTER, CENTER);
    text(this.title, width / 2, height / 4);
  }

  private drawInstructions(): void {
    fill(255);
    textSize(16);
    text(this.instructions, width / 2, height / 2);
  }

  public update(): void {}

  public changePage(page: string): void {
    // switch between pages
    if (page === "Game") {
      // changePage(page);
    }
  }
}

class ChooseBoard implements IGamePage {
  changePage(page: string, board?: number): void {}

  draw(): void {}

  update(): void {}
}

class EndOfGame implements IGamePage {
  changePage(page: string, board?: number): void {}

  draw(): void {}

  update(): void {}
}
