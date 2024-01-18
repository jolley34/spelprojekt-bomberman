class Game {
  private gameBoard: GameBoard;
  private startPage: StartPage;
  private chooseBoard: ChooseBoard;
  private gameBoardFactory: GameBoardFactory;

  //private endOfGame: EndOfGame;
  private currentPage: "StartPage" | "ChooseBoard" | "EndOfGame";

  constructor() {
    this.gameBoard = new GameBoard();
    this.startPage = new StartPage(this);
    this.chooseBoard = new ChooseBoard(this);
    this.gameBoardFactory = new GameBoardFactory();
    //this.endOfGame = new EndOfGame();
    this.currentPage = "StartPage" || "ChooseBoard" || "EndOfGame";
  }

  public changePage(newPage: "StartPage" | "ChooseBoard" | "EndOfGame"): void {
    this.currentPage = newPage;
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
    }
  }
}
