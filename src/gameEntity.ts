class GameEntity {
  private positionX: number;
  private positionY: number;
  private size: number;
  private color: string;

  constructor(positionX: number, positionY: number, size: number) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.size = size;
    this.color = "red";
  }
  public draw() {
    push();
    fill(this.color);
    square(this.positionX, this.positionY, this.size);
    pop();
  }
}
