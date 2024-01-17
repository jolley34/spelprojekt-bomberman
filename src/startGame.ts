interface IGamePage {
  changePage(page: string, board?: number): void;
  draw(): void;
  update(): void;
}

//Implement the interface
class StartPage {
  private game: IGamePage;
  private buttons: Boolean;
  private title: string;
  private instructions: string;
  private highScore: string;

  constructor(game: IGamePage) {
    this.title = "Cruel Nature";
    this.instructions =
      "INSTRUCTIONS  \n \n Lorem ipsum dolor sit amet,  sed do eiusmod \n \n tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim sint\n \n  ea commodo consequat. Duis aute irure dolor in reprehenderit in \n \n voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur\n \n Press START GAME to begin";
    this.highScore = "High Score - 35:00";
    this.buttons = false;
    this.createStartButton();
    this.game = game;
  }

  private createStartButton(): void {
    let startButton = createButton("START GAME");
    startButton.addClass("my-button");
    startButton.position(windowWidth / 2, windowHeight / 2 + 200);
    startButton.style("transform", "translate(-50%, -50%)");
    // this.startButton.style("padding", "10px 20px");
    // this.startButton.style("font-size", "16px");
    // this.startButton.style("font-family", "Minecraft");
    // this.startButton.style("background-color", "black");
    // this.startButton.style("color", "white");
    // this.startButton.style("border", "solid white");
    // this.startButton.style("border-radius", "8px");

    startButton.mousePressed(() => {
      console.log("I was pressed");
      this.changePage("Game");
    });
  }

  public draw(): void {
    this.drawTitle();
    this.drawInstructions();
    this.drawHighScore();
  }

  private drawTitle(): void {
    textSize(64);
    let padding = 100;
    let rectHeight = 100;
    let rectWidth = textWidth(this.title) + padding * 2;

    let rectX = width / 2 - rectWidth / 2;
    let rectY = height / 4 - rectHeight / 2 - 120;

    fill(0);
    noStroke();
    rect(rectX, rectY, rectWidth, rectHeight, 10);

    push();
    fill("#B3D917");
    textAlign(CENTER, CENTER);
    textFont("Minecraft");
    text(this.title, width / 2, height / 4 - 120);
    pop();
  }
  private drawHighScore() {
    fill("#CA0305");
    textSize(40);
    textAlign(CENTER, CENTER);
    textFont("Minecraft");
    text(this.highScore, width / 2, height / 2 - 200);
  }

  private drawInstructions(): void {
    let rectPositionX = width / 2;
    let rectPositionY = height / 2;
    let rectWidth = width / 2;
    let rectHeight = 270;

    let padding = 10;
    let textX = rectPositionX;
    let textY = rectPositionY + padding;

    push();
    fill(0);
    noStroke();
    rectMode(CENTER);
    rect(rectPositionX, rectPositionY, rectWidth, rectHeight, 10);

    fill(255);
    textSize(16);
    textFont("Minecraft");
    textAlign(CENTER, CENTER);
    text(this.instructions, textX, textY, rectWidth - padding * 2);
    pop();
  }

  public update(): void {
    if (this.buttons) {
      //this.drawButtons();
    }
  }

  public changePage(page: string): void {
    if (page === "Game") {
      //currentPage = new ChooseBoard();
    }
  }
}

function drawBorder(borderSize: number) {
  fill(0);
  rect(0, 0, windowWidth, windowHeight);

  // Adjust canvas size for the border
  return {
    innerWidth: windowWidth - 2 * borderSize,
    innerHeight: windowHeight - 2 * borderSize,
    offsetX: borderSize,
    offsetY: borderSize,
  };
}

function drawBackgroundImage(img: p5.Image, borderSize: number) {
  let { innerWidth, innerHeight, offsetX, offsetY } = drawBorder(borderSize);

  // Calculate scale factor to fit the image inside the border
  let scaleFactor = calculateScaleFactor(img, innerWidth, innerHeight);
  let scaledWidth = img.width * scaleFactor;
  let scaledHeight = img.height * scaleFactor;

  // Center the image inside the border
  image(
    img,
    offsetX + innerWidth / 2 - scaledWidth / 2,
    offsetY + innerHeight / 2 - scaledHeight / 2,
    scaledWidth,
    scaledHeight
  );
}

// Function to calculate the scale factor for the image
function calculateScaleFactor(
  img: p5.Image,
  targetWidth: number,
  targetHeight: number
) {
  let imgAspectRatio = img.width / img.height;
  let targetAspectRatio = targetWidth / targetHeight;

  let scaleFactor;
  if (imgAspectRatio > targetAspectRatio) {
    // Image is wider relative to target dimensions
    scaleFactor = targetHeight / img.height;
  } else {
    // Image is taller relative to target dimensions
    scaleFactor = targetWidth / img.width;
  }

  return scaleFactor;
}
