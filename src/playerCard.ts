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
  }

  public addPowerUp() {}
}
