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
    fill(0);
    noStroke();
    rectMode(CENTER);
    rect(this.positionX, this.positionY + 50, 250, 150, 10);

    fill("255");
    textSize(20);
    textAlign(CENTER, CENTER);
    text(this.name, this.positionX, this.positionY);
    pop();

    const heartSpacing = 50;
    const startX = this.positionX - (heartSpacing * (this.lives - 1)) / 2;
    for (let i = 0; i < this.lives; i++) {
      this.drawHeart(startX + i * heartSpacing, this.positionY + 50);
    }
  }

  public addPowerUp() {}
}
