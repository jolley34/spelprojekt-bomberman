/// <reference path="gameEntity.ts" />
class Obstacle extends GameEntity {
  private size: number;
  private color: string;
  constructor(
    color: string,
    positionX: number,
    positionY: number,
    size: number
  ) {
    super(positionX, positionY);
    this.size = size;
    this.color = color;

    // Additional setup for obstacles
  }
  public draw() {
    push();
    fill(this.color);
    square(this.positionX, this.positionY, this.size);
    pop();
  }
}
