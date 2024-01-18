/// <reference path="gameEntity.ts" />

class Player extends GameEntity {
  public speed: number;
  public blockSize: number; // Define blockSize as an instance variable

  constructor(x: number, y: number, blockSize: number) {
    super(x, y);
    this.speed = 2;
    this.blockSize = blockSize; // Store blockSize as an instance variable
  }

  public update(): void {
    // Implement player movement logic here
    // For example, you can use key presses to move the player
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    } else if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed;
    } else if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed;
    }
  }

  public draw(): void {
    fill(255, 0, 0);
    rect(this.x, this.y, this.blockSize, this.blockSize); // Use this.blockSize
  }
}
