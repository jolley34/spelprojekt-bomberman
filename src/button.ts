class Button {
  private positionX: number;
  private positionY: number;
  private width: number;
  private height: number;
  private text: string;
  private image?: p5.Image;

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
  }

  public drawButton(): void {
    let button = createButton(this.text);

    button.addClass("my-button");
    button.position(this.positionX, this.positionY);
    button.size(this.width, this.height);
    button.mousePressed(this.isButtonPressed);
  }

  public isButtonPressed() {}

  public update(): void {
    this.drawButton();
  }
}
