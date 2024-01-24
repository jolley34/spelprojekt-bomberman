class PlayerCard {
  name: string;
  // icon: p5.Image;
  lives: number;
  positionX: number;
  positionY: number;

  constructor(
    name: string,
    //icon: p5.Image,
    lives: number,
    positionX: number,
    positionY: number
  ) {
    this.name = name;
    // this.icon = icon;
    this.lives = lives;
    this.positionX = positionX;
    this.positionY = positionY;
  }

  public removeLife() {
    this.lives--;
  }

  private drawHeart(x: number, y: number) {
    push();
    fill(255, 0, 0);
    beginShape();
    vertex(x, y);
    bezierVertex(x - 15, y - 15, x - 30, y + 20, x, y + 30);
    bezierVertex(x + 30, y + 20, x + 15, y - 15, x, y);
    endShape(CLOSE);
    pop();
  }

  public draw() {
    push();
    fill("#5A7885");
    drawingContext.shadowOffsetX = 5;
    drawingContext.shadowOffsetY = 10;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = "black";
    noStroke();
    rectMode(CENTER);
    rect(this.positionX, this.positionY + 50, 250, 150, 10);
    fill("255");
    textSize(30);
    textAlign(RIGHT);
    text(this.name, this.positionX, this.positionY);
    fill("#AECDDB");
    circle(this.positionX * 1.4, this.positionY * 2 + 50, 100);
    image(
      assets.images.player1Animations[0],
      this.positionX * 1.325,
      this.positionY * 2.55,
      45,
      45
    );
    pop();

    const heartSpacing = 50;
    const startX = this.positionX - (heartSpacing * this.lives) / 2;
    for (let i = 0; i < this.lives; i++) {
      this.drawHeart(startX + i * heartSpacing, this.positionY + 50);
    }
  }

  public addPowerUp() {}
}
