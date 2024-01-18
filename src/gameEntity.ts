class GameEntity {
  public positionX: number;
  public positionY: number;
  static this: any;

  constructor(positionX: number, positionY: number) {
    this.positionX = positionX;
    this.positionY = positionY;
  }
  public draw() {}
}
