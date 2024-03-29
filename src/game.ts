type PageName = "StartPage" | "ChooseBoardPage" | "GameBoard" | "EndOfGame";

class Game {
  private gameBoard: GameBoard | null;
  private gameBoardFactory: GameBoardFactory;
  private startPage: StartPage;
  private chooseBoard: ChooseBoard;
  private currentPage: PageName;
  private countdownTime: number;
  private isCountdownActive: boolean;
  private showFightText: boolean;
  private isBoardSelected: boolean;
  private countdownSoundsPlayed: boolean[] = [false, false, false, false];

  constructor() {
    this.gameBoardFactory = new GameBoardFactory();
    this.gameBoard = null; // don't generate a gameboard until we need it
    this.startPage = new StartPage(this);
    this.chooseBoard = new ChooseBoard(this);
    this.currentPage = "StartPage";
    this.countdownTime = 3;
    this.isCountdownActive = false;
    this.showFightText = false;
    this.isBoardSelected = false;
  }

  public changePage(page: PageName, board?: number): void {
    this.currentPage = page;
    if (page === "GameBoard" && board !== undefined) {
      this.isBoardSelected = true;
      this.isCountdownActive = false; // Countdown starts only after the board is shown
      this.gameBoard = this.gameBoardFactory.generateGameBoard(board);
    }
  }

  private updateCountdown(): void {
    if (this.isCountdownActive) {
      if (frameCount % 60 === 0 && this.countdownTime > 0) {
        this.countdownTime--;
      }
      switch (this.countdownTime) {
        case 3:
          if (!this.countdownSoundsPlayed[0]) {
            assets.playerSoundEffects.powerupsound[4].play();
            this.countdownSoundsPlayed[0] = true;
          }
          break;
        case 2:
          if (!this.countdownSoundsPlayed[1]) {
            assets.playerSoundEffects.powerupsound[5].play();
            this.countdownSoundsPlayed[1] = true;
          }
          break;
        case 1:
          if (!this.countdownSoundsPlayed[2]) {
            assets.playerSoundEffects.powerupsound[6].play();
            this.countdownSoundsPlayed[2] = true;
          }
          break;
        case 0:
          if (!this.countdownSoundsPlayed[3]) {
            assets.playerSoundEffects.powerupsound[7].play();
            this.countdownSoundsPlayed[3] = true;
          }
          break;
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

  public update(): void {
    if (this.isBoardSelected && !this.isCountdownActive) {
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

  public draw(): void {
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
        text(textToDisplay, width / 2 + 25, height / 2 - 50);
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
