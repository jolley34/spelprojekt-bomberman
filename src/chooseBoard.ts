class ChooseBoard {
  private image: p5.Image;
  private gardenBoard: p5.Image;
  private iceBoard: p5.Image;
  private game: Game;
  private gardenBoardButton: Button;
  private iceBoardButton: Button;
  private isCountdownVisible: boolean = false;


  private countdownImages: p5.Image[] = []; // Array för att spara alla countdown bilder
  private countdownImageIndex: number = 0; // index för att visa vilken bild som visas
  private countdownImageDuration: number = 1000; // en sek
  private previousCountdownTime: number = 0; // variabel för att spara previous countdown bild 



  constructor(game: Game) {
    this.image = loadImage("../assets/background/Controls.svg");
    this.gardenBoard = loadImage("../assets/background/cruel_nature_bg1.png");
    this.iceBoard = loadImage("../assets/background/winter_background.png");
    
    this.countdownImages[0] = loadImage("../assets/background/countdown 1.png");
    this.countdownImages[1] = loadImage("../assets/background/countdown 2.png");
    this.countdownImages[2] = loadImage("../assets/background/countdown 3.png");
    this.countdownImages[3] = loadImage("../assets/background/countdown fight.png");
    
    this.game = game;
    this.gardenBoardButton = new Button(
      width / 4 + 130,
      height / 2 + 270,
      250,
      50,
      "Garden Board"
    );
    this.iceBoardButton = new Button(
      width / 4 + width / 2 - 130,
      height / 2 + 270,
      250,
      50,
      "Ice Board"
    );
  }
  
  public update() {
    
    if (this.gardenBoardButton.isButtonPressed()) {
      // visa countdown images consecutively
      this.showCountdownImages();
      
      
      if (!this.isCountdownVisible) {
        this.handleGardenBoardSelection();
      }
    }
    
    if (this.iceBoardButton.isButtonPressed()) {
      this.handleIceBoardSelection();
    }
  }
  
  private showCountdownImages() {
    let currentTime = millis(); // Get the current time in milliseconds
  
    if (currentTime - this.previousCountdownTime >= this.countdownImageDuration) {
      // if sats för att kolla om tiden har passerat så att nästa bild kan visas 
      this.countdownImageIndex = (this.countdownImageIndex + 1) % this.countdownImages.length;
      this.previousCountdownTime = currentTime; // Updatera tiden
      this.isCountdownVisible = true; 
    } else{
      this.isCountdownVisible= false;
    }
  }
private handleGardenBoardSelection() {
  const gardenBoardNumber = this.chooseGardenBoard();
  this.game.changePage("GameBoard", gardenBoardNumber);
}

private handleIceBoardSelection() {
  const iceBoardNumber = this.chooseIceBoard();
  this.game.changePage("GameBoard", iceBoardNumber);
}

  public chooseGardenBoard() {
    return 1;
  }

  public chooseIceBoard(): number {
    return 2;
  }

  public draw() {
    drawBackgroundImage(assets.images.backgroundImages[0], 150);
    push();
    textSize(64);
    const padding = 100;
    const rectHeight = 100;
    const offsetY = 140;
    const rectWidth = textWidth("Cruel Nature") + padding * 2;

    const rectX = width / 2 - rectWidth / 2;
    const rectY = height / 4 - rectHeight / 2 - offsetY;

    fill(0);
    noStroke();
    rect(rectX, rectY, rectWidth, rectHeight, 10);

    fill("#B3D917");
    textAlign(CENTER, CENTER);
    text("Cruel Nature", width / 2, height / 4 - offsetY);
    pop();

    image(this.image, width / 4, height / 4, width / 2, height / 2);

    if (this.gardenBoardButton.isButtonPressed()) {
      this.showCountdownImages(); // Call showCountdownImages when the button is pressed
    }

    if (this.isCountdownVisible) {
      // Display the current countdown image
      image(this.countdownImages[this.countdownImageIndex], 0, 0, width, height);
    }

    this.gardenBoardButton.draw();
    this.iceBoardButton.draw();
  }
}
