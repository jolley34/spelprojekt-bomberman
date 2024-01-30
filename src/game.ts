type PageName = "StartPage" | "ChooseBoardPage" | "GameBoard" | "EndOfGame";

class Game {
  private gameBoard: GameBoard | null;
  private gameBoardFactory: GameBoardFactory;
  private startPage: StartPage;
  private chooseBoard: ChooseBoard;
  // private endOfGame: EndOfGame;
  private currentPage: PageName;
  private countdownTime: number;
  private isCountdownActive: boolean;
  private showFightText: boolean;

  private isBoardSelected: boolean;

  constructor() {
    this.gameBoardFactory = new GameBoardFactory();
    this.gameBoard = null; // don't generate a gameboard until we need it
    this.startPage = new StartPage(this);
    this.chooseBoard = new ChooseBoard(this);
    //this.endOfGame = new EndOfGame(this);
    this.currentPage = "StartPage";
    this.countdownTime = 3;
    this.isCountdownActive = false;
    this.showFightText = false;

    this.isBoardSelected = false;
  }

  public changePage(page: PageName, board?: number) {
    this.currentPage = page;
    if (page === "GameBoard" && board !== undefined) {
      this.isBoardSelected = true;
      this.isCountdownActive = false; // Countdown starts only after the board is shown
      this.gameBoard = this.gameBoardFactory.generateGameBoard(board);
    }
  }

  private updateCountdown() {
    if (this.isCountdownActive) {
      if (frameCount % 60 === 0 && this.countdownTime > 0) {
        this.countdownTime--;
      }
      if (this.countdownTime === 0) {
        if (!this.showFightText) {
          this.showFightText = true;
          this.countdownTime = 1; // show the fight text for 1 second
        } else {
          this.isCountdownActive = false;
          this.showFightText = false;
          if (this.gameBoard) {
            this.gameBoard.startGame();
          }
        }
      }
    }
  }

  public update() {
    if (this.isBoardSelected && !this.isCountdownActive) {
      // Start the countdown only after the board is displayed
      this.isCountdownActive = true;
      this.countdownTime = 3;
      this.showFightText = false;
      this.isBoardSelected = false;
    }
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
            if (this.gameBoard.isGameOver()) {
              this.gameBoard.endGame();
            }
          }
          break;
      }
    }
  }

  public draw() {
    background("black");
    if (this.currentPage === "GameBoard" && this.gameBoard) {
      this.gameBoard.draw();
      if (this.isCountdownActive) {
        fill("#FFF48F");
        textSize(120);
        textAlign(CENTER, CENTER);
        let textToDisplay = this.showFightText
          ? "F I G H T !"
          : this.countdownTime.toString();
        text(textToDisplay, width / 2, height / 2);
      }
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
