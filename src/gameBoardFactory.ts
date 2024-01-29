class GameBoardFactory {
  private board1: number[][];
  private board2: number[][];

  constructor() {
    // 1 = Statiskt hinder
    // 2 = borttagbara hinder
    // 3 = powerup - speedup
    // 4 = powerup - Slow down opponent
    // 8 = Spelare
    // 9 = Spelare
    // Se till att den här innehåller fler si
    // prettier-ignore
    this.board1 = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 8, 0, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 2, 3, 1, 2, 1, 0, 1, 0, 1, 0, 1, 2, 1, 3, 0, 0, 1],
      [1, 2, 0, 2, 2, 0, 0, 2, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 1],
      [1, 2, 1, 1, 1, 2, 1, 0, 1, 2, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 2, 1, 2, 2, 2, 0, 2, 2, 2, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 2, 2, 4, 1, 0, 1, 0, 1, 0, 1, 3, 1, 0, 1, 0, 1, 0, 1],
      [1, 2, 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 2, 2, 0, 0, 3, 0, 0, 0, 1],
      [1, 2, 1, 2, 1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 2, 2, 2, 2, 2, 0, 0, 3, 2, 1, 0, 1, 0, 2, 2, 2, 2, 2, 2, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 2, 1, 2, 1, 2, 1],
      [1, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 4, 0, 0, 2, 2, 2, 2, 2, 1],
      [1, 0, 0, 0, 1, 2, 1, 2, 1, 0, 1, 0, 1, 2, 1, 0, 2, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 2, 0, 9, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    this.board2 = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 8, 0, 0, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 3, 1, 2, 1, 0, 1, 0, 1, 0, 1, 2, 1, 3, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 2, 0, 0, 1, 0, 1, 0, 1, 0, 1, 3, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1],
      [1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 2, 2, 2, 0, 0, 3, 0, 1, 0, 1, 0, 0, 0, 2, 0, 2, 2, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1],
      [1, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
  }

  public generateGameBoard(boardNumber: number): GameBoard {
    const board = boardNumber === 1 ? this.board1 : this.board2;
    const entities: GameEntity[] = [];

    const player1Animations = {
      left: [7, 6, 8, 6],
      right: [10, 9, 11, 9],
      up: [4, 3, 5, 3],
      down: [1, 0, 2, 0],
    };

    const player2Animations = {
      left: [20, 18, 19, 18],
      right: [23, 21, 22, 21],
      up: [17, 15, 16, 15],
      down: [14, 12, 13, 12],
    };

    const player1AnimationsIdle = {
      playerLeftIdle: [6],
      playerRightIdle: [9],
      playerUpIdle: [3],
      playerDownIdle: [0],
      playerDefaultIdle: [0],
    };

    const player2AnimationsIdle = {
      playerLeftIdle: [18],
      playerRightIdle: [21],
      playerUpIdle: [15],
      playerDownIdle: [12],
      playerDefaultIdle: [12],
    };

    // Choose the correct texture index for the board
    const staticObstacleTextureIndex = boardNumber === 1 ? 0 : 9;
    const removableObstacleTextureIndex = boardNumber === 1 ? 6 : 8;

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
          entities.push(
            new StaticObstacle(x, y, blockSize, staticObstacleTextureIndex)
          );
        }
        if (board[i][j] === 2) {
          entities.push(
            new RemovebleObstacle(
              x,
              y,
              blockSize,
              removableObstacleTextureIndex
            )
          );
        }
        if (board[i][j] === 3) {
          entities.push(new SpeedUp(x, y, blockSize));
        }
        if (board[i][j] === 4) {
          entities.push(new SlowDownOpponent(x, y, blockSize));
        }
        if (board[i][j] === 9) {
          const player = new Player(
            x,
            y,
            blockSize * 0.8,
            {
              up: UP_ARROW,
              left: LEFT_ARROW,
              down: DOWN_ARROW,
              right: RIGHT_ARROW,
              placeBomb: 80,
            },

            1,
            player1Animations.left,
            player1Animations.right,
            player1Animations.up,
            player1Animations.down,
            player1AnimationsIdle

          );
          entities.push(player);
        }
        if (board[i][j] === 8) {
          const player2 = new Player(
            x,
            y,
            blockSize * 0.8,
            {
              up: 87,
              left: 65,
              down: 83,
              right: 68,
              placeBomb: 67,
            },
            2,
            player2Animations.left,
            player2Animations.right,
            player2Animations.up,
            player2Animations.down,
            player2AnimationsIdle
          );


          entities.push(player2);
        }
      }
    }

    return new GameBoard(
      entities,
      assets.images.backgroundImages[boardNumber],
      assets.images.player1Animations[0]
    );
  }
}
