let backgroundImage: p5.Image;

class GameBackground {
  backgroundImage: p5.Image;

  constructor(img: p5.Image) {
    this.backgroundImage = img;
  }

  public setupGameBackground() {
    createCanvas(windowWidth, windowHeight);
  }

  public drawGameBackground() {
    image(this.backgroundImage, 0, 0, width, height);
  }
}

class GameBoard {
  positionX: number;
  positionY: number;

  private player1: Player;

  constructor() {
    //default value till position
    this.positionX = 0;
    this.positionY = 0;

    this.player1 = new Player("black", 100, 100, {
      up: 87, // w
      left: 65, // a
      down: 83, // s
      right: 68, // d
    });
  }
  public update() {
    this.player1.update();
  }

  public setupGameboard() {}

  public preloadGameboard() {}

  // public drawGameboard() {
  //   createCanvas(1000, 1000);
  //   background("red");
  //   push();
  //   this.player1.drawPlayer();
  //   this.update();
  // }
}
