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
  public rektangleWidth: number;
  public rektangleHeight: number;

  private player1: Player;
  private player2: Player;
  isGameOver: boolean

  constructor() {
    this.isGameOver = false;
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
    this.checkCollision();
  }

  private checkCollision (){
    const distance = Math.hypot(
      this.player2.getX() - this.player1.getX(),
      this.player2.getY() - this.player1.getY()
      );
    const limit = this.player1.getSize() + this.player2.getSize();
    if (distance < limit) {
      this.isGameOver = true;
    }

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
