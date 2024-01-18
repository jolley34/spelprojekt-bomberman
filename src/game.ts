// class Game {
//   private position: p5.Vector;
//   private isCircleVisible: boolean;

//   constructor() {
//     this.position = createVector(width * 0.5, height * 0.5);
//     this.isCircleVisible = false;
//   }

//   public update() {
//     this.position.set(mouseX, mouseY);
//     this.isCircleVisible = mouseIsPressed;

//     if (mouseIsPressed) {
//       if (!music.mystery.isPlaying()) {
//         music.mystery.loop();
//       }
//     } else {
//       music.mystery.pause();
//     }
//   }

//   public draw() {
//     background("black");
//     this.drawText();

//     if (this.isCircleVisible) {
//       this.drawCircle();
//     }
//   }

//   public drawText() {
//     push();
//     fill("white");
//     textSize(width * 0.1);
//     textStyle("bold");
//     textAlign("center");
//     text("Click & Drag", width * 0.5, height * 0.5);
//     pop();
//   }

//   public drawCircle() {
//     push();
//     fill(0, 255, 0, 200);
//     stroke("white");
//     strokeWeight(width * 0.01);
//     circle(this.position.x, this.position.y, width * 0.2);
//     pop();
//   }
// }

// src/game/Grid.ts

class Grid {
  private cols: number;
  private rows: number;
  private tileSize: number;
  private grid: number[][];

  constructor(cols: number, rows: number, tileSize: number) {
    this.cols = cols;
    this.rows = rows;
    this.tileSize = tileSize;
    this.grid = this.createDefaultGrid();
  }

  private createDefaultGrid(): number[][] {
    const defaultGrid: number[][] = [];
    for (let i = 0; i < this.rows; i++) {
      defaultGrid[i] = [];
      for (let j = 0; j < this.cols; j++) {
        // 0 represents an open space, 1 represents a wall
        defaultGrid[i][j] = 0;
      }
    }
    return defaultGrid;
  }

  public setWall(x: number, y: number): void {
    if (this.isValidCell(x, y)) {
      this.grid[y][x] = 1;
    }
  }

  public draw(): void {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const x = j * this.tileSize;
        const y = i * this.tileSize;
        const cellValue = this.grid[i][j];

        // Customize the rendering based on the cell value
        if (cellValue === 0) {
          fill(255); // Open space
        } else if (cellValue === 1) {
          fill(0);   // Wall
        }

        stroke(0);
        rect(x, y, this.tileSize, this.tileSize);
      }
    }
  }

  private isValidCell(x: number, y: number): boolean {
    return x >= 0 && x < this.cols && y >= 0 && y < this.rows;
  }

  // Getters for grid properties
  public getCols(): number {
    return this.cols;
  }

  public getRows(): number {
    return this.rows;
  }

  public getTileSize(): number {
    return this.tileSize;
  }
}



