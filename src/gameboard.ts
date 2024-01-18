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

  private rectangles: { x: number; y: number; width: number; height: number }[];

  constructor() {
    this.isGameOver = false;
    //default value till position
    this.positionX = 800;
    this.positionY = 100;
    this.rektangleWidth = 500;
    this.rektangleHeight = 500;

    // array med fyrkanter som ligger som hinder för tillfället. hindret ligger i checkCollissonWithSquares
    this.rectangles = [
      { x: 950, y: 250, width: 50, height: 50 },
      { x: 1050, y: 250, width: 50, height: 50 },
      { x: 1115, y: 250, width: 50, height: 50 },
      { x: 1050, y: 310, width: 50, height: 50 },
      { x:1050, y: 370, width: 50, height: 50 },
    ];

    this.player1 = new Player("black", 100, 100, {
      up: 87, // w
      left: 65, // a
      down: 83, // s
      right: 68, // d
      placeBomb: 16, // shift
    });

    this.player2 = new Player("yellow", 200, 100, {
      up: 38,
      left: 37,
      down: 40,
      right: 39,
      placeBomb: 32, // space
    });
  }
  public update() {
    this.player1.update();
    this.player2.update();
    this.checkCollision();
    this.checkCollisionWithRectangles(this.player1);
    this.checkCollisionWithRectangles(this.player2);
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
  //kollar så att spelarna inte kan gå igenom fyrkanterna från rectangle array
  private checkCollisionWithRectangles(player: Player) {
    for (const rectangle of this.rectangles) {
      const distanceToRectangle = dist(
        player.getX(),
        player.getY(),
        rectangle.x + rectangle.width / 2,
        rectangle.y + rectangle.height / 2
      );

      const limitToRectangle = player.getSize() / 2 + Math.max(rectangle.width, rectangle.height) / 2;

      if (distanceToRectangle < limitToRectangle) {
        const angle = atan2(
          player.getY() - (rectangle.y + rectangle.height / 2),
          player.getX() - (rectangle.x + rectangle.width / 2)
        );
        player.setX(rectangle.x + rectangle.width / 2 + cos(angle) * limitToRectangle);
        player.setY(rectangle.y + rectangle.height / 2 + sin(angle) * limitToRectangle);
      }
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
    push();
    for (const rectangle of this.rectangles) {
      fill("black");
      rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    }
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
