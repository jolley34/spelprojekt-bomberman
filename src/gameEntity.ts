class GameEntity {
  private image: p5.Image;
  public x: number;
  public y: number;
  private size: number;
  // private sound: p5.SoundFile;

  constructor(image: p5.Image, x: number, y: number, size: number) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.size = size;
  }

  public update(): void {}

  public draw(): void {
    push();
    image(this.image, this.x, this.y, this.size, this.size);
    pop();
  }
}
