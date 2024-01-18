class Game {
  private gameboard: Gameboard;
  private startPage: StartPage;
  private chooseBoard: ChooseBoard;
  //private endOfGame: EndOfGame;
  private currentPage: "StartPage" | "ChooseBoard" | "EndOfGame";

  constructor() {
    this.gameboard = new Gameboard();
    this.startPage = new StartPage(this);
    this.chooseBoard = new ChooseBoard(this);
    //this.endOfGame = new EndOfGame();
    this.currentPage = "StartPage" || "ChooseBoard" || "EndOfGame";
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
