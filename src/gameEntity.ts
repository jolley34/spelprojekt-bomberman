class GameEntity {
  public x: number;
  public y: number;
  public image: p5.Image;
  public size: number;
  public shouldBeRemoved: boolean;

  constructor(image: p5.Image, x: number, y: number, size: number) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.size = size;
    this.shouldBeRemoved = false;
  }

  public getHitBox() {
    return {
      left: this.x,
      top: this.y,
      width: this.size,
      height: this.size,
    };
  }

  public update(gameBoard: IAddEntity): void {}

  public draw(): void {
    push();
    image(this.image, this.x, this.y, this.size, this.size);

    const hitBox = this.getHitBox();
    stroke("red");
    noFill();
    rect(hitBox.left, hitBox.top, hitBox.width, hitBox.height);
    pop();
  }
}
