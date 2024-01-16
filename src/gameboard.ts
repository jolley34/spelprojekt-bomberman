let backgroundImage: p5.Image;

class GameBackground {
  //backgroundImage: p5.Image;

  constructor() {
    // this.backgroundImage = loadImage("./assets/background/map1-blurred.png");
  }

  public setupGameBackground() {
    createCanvas(windowWidth, windowHeight);
  }

  public drawGameBackground() {
    //background(this.backgroundImage);
  }
}

class Gameboard {
  positionX: number;
  positionY: number;
  private rektangleWidth: number;
  private rektangleHeight: number;

  private player1: Player;
  private player2: Player;

  constructor() {
    //default value till position
    this.positionX = 800;
    this.positionY = 100;
    this.rektangleWidth = 500;
    this.rektangleHeight = 500;

    this.player1 = new Player("black", 100, 100, {
      up: 87, // w
      left: 65, // a
      down: 83, // s
      right: 68, // d
    });

    this.player2 = new Player("yellow", 200, 100, {
      up: 38,
      left: 37,
      down: 40,
      right: 39,
    });
  }
  public update() {
    this.player1.update();
    this.player2.update();
  }

  public setupGameboard() {}

  public preloadGameboard() {}

  public drawGameboard() {
    background("red");
    push();
    rect(
      this.positionX,
      this.positionY,
      this.rektangleWidth,
      this.rektangleHeight
    );
    fill("white");
    pop();
    // let d = dist(
    //this.player1.x, this.player1.y, this.player2.x, this.player2.y;
    //);
    // text(d, 50, 50);
    this.player1.drawPlayer();
    this.player2.drawPlayer();
    this.update();
  }
}
