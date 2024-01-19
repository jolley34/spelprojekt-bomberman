class Game {
  public gameBoard: GameBoard;
  private startPage: StartPage;
  public chooseBoard: ChooseBoard;
  public gameBoardFactory: GameBoardFactory;

  //private endOfGame: EndOfGame;
  private currentPage:
    | "StartPage"
    | "ChooseBoard"
    | "GameBoardPage"
    | "EndOfGame";

  constructor() {
    this.startPage = new StartPage(this);
    this.chooseBoard = new ChooseBoard(this);
    this.gameBoardFactory = new GameBoardFactory();
    this.gameBoard = this.gameBoardFactory.generateGameBoard(1);
    //this.endOfGame = new EndOfGame();
    this.currentPage = "StartPage" || "ChooseBoard" || "EndOfGame";
  }

  public setGameBoard(gameBoard: GameBoard): void {
    this.gameBoard = gameBoard;
  }

  public changePage(
    newPage: "StartPage" | "ChooseBoard" | "GameBoardPage" | "EndOfGame"
  ): void {
    this.currentPage = newPage;
    currentScreen = newPage;
  }

  public update() {
    if (keyIsDown(32)) {
      this.currentPage = "StartPage";
    } else if (keyIsDown(13)) {
      this.currentPage = "ChooseBoard";
    }
  }

  public draw() {
    if (this.currentPage === "StartPage") {
      console.log("Welcome to the start page");
      this.startPage.draw();
    } else if (this.currentPage === "ChooseBoard") {
      console.log("Welcome to the choose board page");
      this.chooseBoard.draw();
    } else if (this.currentPage === "GameBoardPage") {
      console.log("Welcome to the game board page");
      this.gameBoard.update();
      this.gameBoard.draw();
    }
  }
}
