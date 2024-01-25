class PlayerCard {
  name: string;
  icon: p5.Image;
  lives: number;
  positionX: number;
  positionY: number;

  constructor(
    name: string,
    icon: p5.Image,
    lives: number,
    positionX: number,
    positionY: number
  ) {
    this.name = name;
    this.icon = icon;
    this.lives = lives;
    this.positionX = positionX;
    this.positionY = positionY;
  }

  public removeLife() {
    this.lives--;
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
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 0;
    drawingContext.shadowColor = "black";
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 20;
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = "black";

    const heartSpacing = 50;
    const startX = this.positionX - (heartSpacing * (this.lives - 1)) / 2;
    for (let i = 0; i < this.lives; i++) {
      image(
        assets.images.playerCard[0],
        startX + i * heartSpacing - 20,
        this.positionY + 45,
        40,
        40
      );
    }
    const startCircle = this.positionX / 2;
    for (let i = 0; i < this.lives; i++) {
      fill("#AECDDB");
      circle(startCircle * 2, this.positionY * 4, 100);
      drawingContext.shadowOffsetX = 0;
      drawingContext.shadowOffsetY = 0;
      drawingContext.shadowBlur = 0;
      drawingContext.shadowColor = "black";
    }

    // Drawing the player icon
    const circleCenterX = this.positionX;
    const circleCenterY = this.positionY * 4;
    const circleDiameter = 100;
    fill("#AECDDB");
    circle(circleCenterX, circleCenterY, circleDiameter);
    imageMode(CENTER);
    image(
      this.icon,
      circleCenterX,
      circleCenterY,
      circleDiameter - 20,
      circleDiameter - 20
    );

    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 0;
    drawingContext.shadowColor = "black";

    fill("255");
    textSize(30);
    textAlign(CENTER);
    text(this.name, this.positionX, this.positionY);

    pop();
  }

  public addPowerUp() {}
}
