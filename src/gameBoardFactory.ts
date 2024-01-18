class GameBoardFactory {
  private board1: number[][];
  // private board2: number[][];

  constructor() {
    // 1 = Statiskt hinder
    // 9 = Spelare
    // Se till att den här innehåller fler siffror
    this.board1 = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 9, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
  }

  public drawFloor() {
    const blockSize = 33;
    const centerX = width / 2 - (this.board1[0].length * blockSize) / 2;
    const centerY = height / 2 - (this.board1.length * blockSize) / 2;

    for (let i = 0; i < this.board1.length; i++) {
      for (let j = 0; j < this.board1[i].length; j++) {
        const x = centerX + j * blockSize;
        const y = centerY + i * blockSize;

        fill(144, 238, 144); // Sätter färg på golv (ljusgrön)
        rect(x, y, blockSize, blockSize); // skapar storleken på blocket.
      }
    }
  }

  public generateGameBoard(boardNumber: number): GameBoard {
    const board = this.board1;
    const entities: GameEntity[] = [];

    const blockSize = 33;
    const centerX = width / 2 - (board[0].length * blockSize) / 2.136;
    const centerY = height / 2 - (board.length * blockSize) / 1.88;

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const x = centerX + j * blockSize;
        const y = centerY + i * blockSize;

        if (board[i][j] === 1) {
          entities.push(new Obstacle(x, y, blockSize));
        }
        if (board[i][j] === 9) {
          const player = new Player(x, y, blockSize);
          entities.push(player);
        }
      }
    }

    return new GameBoard(entities);
  }
}
