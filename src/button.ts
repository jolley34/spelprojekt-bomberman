class Button {
  private positionX: number;
  private positionY: number;
  private width: number;
  private height: number;
  private text: string;
  private image?: p5.Image;
  private opacity: number;
  private opacityChange: number;
  private hoverTextColor: string = "#ffffff";

  constructor(
    positionX: number,
    positionY: number,
    width: number,
    height: number,
    text: string
  ) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height;
    this.text = text;
    this.opacity = 255;
    this.opacityChange = -10;
  }

  public drawButton(): void {
    push();
    fill(0);
    noStroke();
    rectMode(CENTER);
    rect(this.positionX, this.positionY, this.width, this.height, 10);

    fill("#B3D917");
    textSize(20);
    textFont("Minecraft");
    textAlign(CENTER, CENTER);
    text(this.text, this.positionX, this.positionY);

    pop();
  }

  public isButtonPressed() {
    if (
      mouseX > this.positionX - this.width / 2 &&
      mouseX < this.positionX + this.width / 2 &&
      mouseY > this.positionY - this.height / 2 &&
      mouseY < this.positionY + this.height / 2
    ) {
      return true;
    }
    return false;
  }

  public update(): void {
    this.drawButton();
  }
}
