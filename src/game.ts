class Game {
  private gameBoard: GameBoard;
  private gameBoardFactory: GameBoardFactory;

  constructor() {
    this.gameBoardFactory = new GameBoardFactory();
    this.gameBoard = this.gameBoardFactory.generateGameBoard(1);
  }

  public update() {
    // this.gameboard.update();
  }

  public draw() {
    this.gameBoard.draw();
  }
}
