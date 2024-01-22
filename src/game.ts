type PageName = "StartPage" | "ChooseBoardPage" | "GameBoard";

class Game {
  private gameBoard: GameBoard;
  private gameBoardFactory: GameBoardFactory;
  private startPage: StartPage;
  private chooseBoard: ChooseBoard;
  private currentPage: PageName;

  constructor(board: number) {
    this.gameBoardFactory = new GameBoardFactory();
    this.gameBoard = this.gameBoardFactory.generateGameBoard(board);
    this.startPage = new StartPage(this);
    this.chooseBoard = new ChooseBoard(this);
    this.currentPage = "StartPage";
  }

  public changePage(page: PageName, board?: number) {
    if (this.currentPage === "GameBoard") {
      // this.gameBoard.endGame();
    }

    this.currentPage = page;

    if (page === "GameBoard") {
      if (board) {
        this.gameBoard = this.gameBoardFactory.generateGameBoard(board);
      }
      this.gameBoard.startGame();
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
        this.gameBoard.update();
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
        this.gameBoard.draw();
        break;
    }
  }
}
