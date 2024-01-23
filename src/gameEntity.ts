class GameEntity {
  public x: number;
  public y: number;
  public image: p5.Image;
  public size: number;
  public bombs: Bomb[];

  constructor(image: p5.Image, x: number, y: number, size: number) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.size = size;
    this.bombs = [];
  }
  public addBomb(bomb: Bomb): void {
    this.bombs.push(bomb);
  }

  public update(): void {}

  public draw(): void {
    push();
    image(this.image, this.x, this.y, this.size, this.size);
    pop();
  }
}
