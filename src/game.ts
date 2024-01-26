type PageName = "StartPage" | "ChooseBoardPage" | "GameBoard" | "EndOfGame";

class Game {
  private gameBoard: GameBoard | null;
  private gameBoardFactory: GameBoardFactory;
  private startPage: StartPage;
  private chooseBoard: ChooseBoard;
  private endOfGame: EndOfGame;
  private currentPage: PageName;
  private countdownTime: number;
  private isCountdownActive: boolean;
  private showFightText: boolean;

  constructor() {
    this.gameBoardFactory = new GameBoardFactory();
    this.gameBoard = null; // don't generate a gameboard until we need it
    this.startPage = new StartPage(this);
    this.endOfGame = new EndOfGame(this);
    this.chooseBoard = new ChooseBoard(this);
    this.currentPage = "StartPage";
    this.countdownTime = 3;
    this.isCountdownActive = false;
    this.showFightText = false;
  }

  public changePage(page: PageName, board?: number) {
    if (page === "GameBoard" && board !== undefined) {
      this.isCountdownActive = true;
      this.countdownTime = 3;
      this.showFightText = false;
      this.gameBoard = this.gameBoardFactory.generateGameBoard(board);
    } else if (page === "EndOfGame" && this.gameBoard) {
      this.endOfGame.setupGameBackground(this.gameBoard.getBackgroundImage());
      this.currentPage = page;
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
        if (!this.showFightText) {
          this.showFightText = true;
        } else {
          this.isCountdownActive = false;
          this.showFightText = false;
          this.currentPage = "GameBoard";
          if (this.gameBoard) {
            this.gameBoard.startGame();
          }
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
            if (this.gameBoard.isGameOver()) {
              this.changePage("EndOfGame");
            }
          }
          break;
        case "EndOfGame":
          this.endOfGame.update();
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

      let textToDisplay = this.showFightText
        ? "F I G H T !"
        : this.countdownTime.toString();
      text(textToDisplay, width / 2, height / 2);
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
        case "EndOfGame":
          this.endOfGame.draw();
          break;
      }
    }
  }
}
