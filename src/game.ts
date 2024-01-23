type PageName = "StartPage" | "ChooseBoardPage" | "GameBoard";

class Game {
  private gameBoard: GameBoard | null;
  private gameBoardFactory: GameBoardFactory;
  private startPage: StartPage;
  private chooseBoard: ChooseBoard;
  private currentPage: PageName;

  constructor() {
    this.gameBoardFactory = new GameBoardFactory();
    this.gameBoard = null; // don't generate a gameboard until we need it
    this.startPage = new StartPage(this);
    this.chooseBoard = new ChooseBoard(this);
    this.currentPage = "StartPage";
  }

  public changePage(page: PageName, board?: number) {
    this.currentPage = page;
    if (board) {
      if (board !== undefined) {
        this.gameBoard = this.gameBoardFactory.generateGameBoard(board);
      }
      if (this.gameBoard) {
        this.gameBoard.startGame();
      }
    }
  }

  public update() {
    switch (this.currentPage) {
      case "StartPage":
        this.startPage.update();
        break;
      case "ChooseBoardPage":
        this.chooseBoard.update();
        break;
      case "GameBoard":
        if (this.gameBoard) {
          this.gameBoard.update();
        }
        break;
    }
  }

  public draw() {
    background("black");
    switch (this.currentPage) {
      case "StartPage":
        this.startPage.draw();
        break;
      case "ChooseBoardPage":
        this.chooseBoard.draw();
        break;
      case "GameBoard":
        if (this.gameBoard) {
          this.gameBoard.draw();
        }
        break;
    }
  }
}
