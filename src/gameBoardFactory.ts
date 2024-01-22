class GameBoardFactory {
  private board1: number[][];
  // private board2: number[][];

  constructor() {
    // 1 = Statiskt hinder
    // 2 = borttagbara hinder
    // 9 = Spelare
    // Se till att den här innehåller fler si
    // prettier-ignore
    this.board1 = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 2, 2, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1],
      [1, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 9, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
  }

  /* public playInGameMusic() {
    assets.music.ingamemusic.play(); // Spela musik ingame, kallas ej någonstans
  } */

  public drawFloor() {
    const numRows = this.board1.length;
    const numCols = this.board1[0].length;

    // Adjust the scaling (0.6 for 60% size)
    const scalingGameboard = 0.6;
    const blockSize = min(width / numCols, height / numRows) * scalingGameboard;

    const centerX = width / 2 - (numCols * blockSize) / 2.142;
    const centerY = height / 2 - (numRows * blockSize) / 1.89;

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        const x = centerX + j * blockSize;
        const y = centerY + i * blockSize;

        fill(144, 238, 144);
        rect(x, y, blockSize, blockSize);
      }
    }
  }

  public generateGameBoard(boardNumber: number): GameBoard {
    const board = this.board1;
    const entities: GameEntity[] = [];

    const numRows = board.length;
    const numCols = board[0].length;

    // Adjust the scaling (0.6 for 60% size)
    const scalingGameboard = 0.6;
    const blockSize = min(width / numCols, height / numRows) * scalingGameboard;

    const centerX = width / 2 - (numCols * blockSize) / 2.142;
    const centerY = height / 2 - (numRows * blockSize) / 1.89;

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        const x = centerX + j * blockSize;
        const y = centerY + i * blockSize;

        if (board[i][j] === 1) {
          entities.push(new StaticObstacle(x, y, blockSize));
        }
        if (board[i][j] === 2) {
          entities.push(new RemovebleObstacle(x, y, blockSize));
        }
        if (board[i][j] === 9) {
          const player = new Player(x, y, blockSize * 1);
          entities.push(player);
        }
      }
    }

    return new GameBoard(entities, assets.images.backgroundImages[boardNumber]);
  }
}
