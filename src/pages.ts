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
    this.title = "Cruel Nature";
    this.instructions =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.   Press START to begin";
    this.createStartButton();
  }

  private createStartButton(): void {
    this.startButton = createButton("START GAME");
    this.startButton.addClass("my-button");
    this.startButton.position(windowWidth / 2, windowHeight / 2 + 200);
    this.startButton.style("transform", "translate(-50%, -50%)");
    // this.startButton.style("padding", "10px 20px");
    // this.startButton.style("font-size", "16px");
    // this.startButton.style("font-family", "Minecraft");
    // this.startButton.style("background-color", "black");
    // this.startButton.style("color", "white");
    // this.startButton.style("border", "solid white");
    // this.startButton.style("border-radius", "8px");

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

  //   private drawTitle(): void {
  //     push();
  //     fill("255");
  //     textSize(64);
  //     textFont("Minecraft");
  //     textAlign(CENTER, CENTER);
  //     text(this.title, width / 2, height / 4 - 50);
  //     pop();
  //   }

  private drawTitle(): void {
    textSize(64);
    let padding = 50;
    let rectHeight = 100;
    let rectWidth = textWidth(this.title) + padding * 2;

    let rectX = width / 2 - rectWidth / 2;
    let rectY = height / 4 - rectHeight / 2 - 120;

    fill(0);
    noStroke();
    rect(rectX, rectY, rectWidth, rectHeight);

    fill("#B3D917");
    textAlign(CENTER, CENTER);
    textFont("Minecraft");
    text(this.title, width / 2, height / 4 - 120);
  }

  private drawInstructions(): void {
    let rectPositionX = width / 2;
    let rectPositionY = height / 2;
    let rectWidth = width / 2;
    let rectHeight = 250;

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
