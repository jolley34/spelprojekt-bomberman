

class RemovableObstacle extends GameEntity {
    private isDestroyed: boolean;
  
    constructor(x: number, y: number, size: number, textureIndex: number) {
      super(assets.images.maptextures[textureIndex], x, y, size);
      this.isDestroyed = false;
    }
  
    public update(gameBoard: GameBoard): void {
      if (this.isDestroyed) {
        return; 
      }
  
      // Check if the bomb has exploded
      for (const entity of gameBoard.entities) {
        if (entity instanceof Bomb && entity.bombExploded()) {
          this.destroy(gameBoard);
          break; 
        }
      }
    }
  
    private destroy(gameBoard: GameBoard): void {
      this.isDestroyed = true;
  
      // hämta positionen för removableobstacles
      const row = Math.floor(this.y / gameBoard.blockSize());
      const col = Math.floor(this.x / gameBoard.blockSize());
  
      // vilka håll man ska kolla
      const directions = [
        { row: -1, col: 0 }, // Up
        { row: 1, col: 0 },  // Down
        { row: 0, col: -1 }, // Left
        { row: 0, col: 1 },  // Right
      ];
  
      // ta bort alla obstacles åt alla håll tills man kommer till static obstacle
      for (const direction of directions) {
        this.removeObstaclesInDirection(gameBoard, row, col, direction.row, direction.col);
      }
    }
  
    private removeObstaclesInDirection(gameBoard: GameBoard, row: number, col: number, rowDir: number, colDir: number): void {
      while (true) {
        // Move to the next position in the specified direction
        row += rowDir;
        col += colDir;
  
        // Check if the new position is within the bounds of the game board
        if (row < 0 || row >= gameBoard.getNumRows() || col < 0 || col >= gameBoard.getNumCols()) {
          break; // annars stanna
        }
  
        // Get the entity at the current position
        const entity = gameBoard.getEntityAtPosition(row, col);
  
        // om det ej är removable, ta inte bort
        if (entity instanceof StaticObstacle) {
          break;
        }
  
        // om entitetn är removable tas den bort
        if (entity instanceof RemovableObstacle) {
          entity.destroy(gameBoard);
        }
      }
    }
  }
  
  