class GameEntity {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public update(): void {}

  // Declare a draw method that can be overridden by subclasses
  public draw(): void {
    // You can leave it empty here or provide a default behavior
    // or alternatively, mark it as abstract if it should be implemented in subclasses.
  }
}
