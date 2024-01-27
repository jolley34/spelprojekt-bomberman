class Button {
  private positionX: number;
  private positionY: number;
  private width: number;
  private height: number;
  private text: string;
  private color: string;
  private textColor: string;
  private image?: p5.Image;
  constructor(
    positionX: number,
    positionY: number,
    width: number,
    height: number,
    text: string,
    color: string,
    textColor: string
  ) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height;
    this.text = text;
    this.color = color;
    this.textColor = textColor;
  }

  public isButtonPressed() {
    const isHovering =
      mouseX > this.positionX - this.width / 2 &&
      mouseX < this.positionX + this.width / 2 &&
      mouseY > this.positionY - this.height / 2 &&
      mouseY < this.positionY + this.height / 2;

    if (isHovering && mouseIsPressed) {
      return true;
    }
    return false;
  }

  public update(): void {}

  public draw(): void {
    push();
    fill(this.color);
    noStroke();
    rectMode(CENTER);
    rect(this.positionX, this.positionY, this.width, this.height, 10);

    fill(this.textColor);
    textSize(25);
    textAlign(CENTER, CENTER);
    text(this.text, this.positionX, this.positionY);

    pop();
  }
}
