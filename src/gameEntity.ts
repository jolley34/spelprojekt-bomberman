class GameEntity {
  public x: number;
  public y: number;
  public image: p5.Image;
  public size: number;

  constructor(image: p5.Image, x: number, y: number, size: number) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.size = size;
  }

  public update(gameBoard: IAddEntity): void {}

  public draw(): void {
    push();
    image(this.image, this.x, this.y, this.size, this.size);
    pop();
  }
}
