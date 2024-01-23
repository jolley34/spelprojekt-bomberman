type PageName = "StartPage" | "ChooseBoardPage" | "GameBoard";

class Game {
  private gameBoard: GameBoard | null;
  private gameBoardFactory: GameBoardFactory;
  private startPage: StartPage;
  private chooseBoard: ChooseBoard;
  private currentPage: PageName;
  private countdownTime: number;
  private isCountdownActive: boolean;

  constructor() {
    this.gameBoardFactory = new GameBoardFactory();
    this.gameBoard = null; // don't generate a gameboard until we need it
    this.startPage = new StartPage(this);
    this.chooseBoard = new ChooseBoard(this);
    this.currentPage = "StartPage";
    this.countdownTime = 3;
    this.isCountdownActive = false;
  }

  public changePage(page: PageName, board?: number) {
    if (page === "GameBoard" && board !== undefined) {
      this.isCountdownActive = true;
      this.countdownTime = 3;
      this.gameBoard = this.gameBoardFactory.generateGameBoard(board);
    } else {
      this.currentPage = page;
    }
  }

  private updateCountdown() {
    if (this.isCountdownActive) {
      if (frameCount % 60 === 0 && this.countdownTime > 0) {
        this.countdownTime--;
      }
      if (this.countdownTime === 0) {
        this.isCountdownActive = false;
        this.currentPage = "GameBoard";
        if (this.gameBoard) {
          this.gameBoard.startGame();
        }
      }
    }
  }

  public update() {
    if (this.isCountdownActive) {
      this.updateCountdown();
    } else {
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
  }

  public draw() {
    background("black");
    if (this.isCountdownActive && this.gameBoard) {
      this.gameBoard.drawGameBackground();
      fill("white");
      textSize(64);
      textAlign(CENTER, CENTER);
      text(this.countdownTime, width / 2, height / 2);
    } else {
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
}
