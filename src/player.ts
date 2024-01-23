class Player extends GameEntity {
  public speedX: number;
  public speedY: number;
  private animationIndex: number;
  private animationSpeed: number;
  private leftAnimationLoop: number[];
  private rightAnimationLoop: number[];
  private upAnimationLoop: number[];
  private downAnimationLoop: number[];
  private wasKeyPressed: boolean;

  constructor(x: number, y: number, size: number) {
    super(assets.images.player1Animations[0], x, y, size);
    this.speedX = 0;
    this.speedY = 0;
    this.animationIndex = 0;
    this.animationSpeed = 0.8;
    this.wasKeyPressed = false;

    // Vilka bilder jag loopar igenom när jag trycker vänster
    this.leftAnimationLoop = [7, 6, 8, 6];
    this.rightAnimationLoop = [10, 9, 11, 9];
    this.upAnimationLoop = [4, 3, 5, 3];
    this.downAnimationLoop = [1, 0, 2, 0];
  }

  public update(): void {
    // Sätter hastigheten utifrån vad spelaren trycker på för knapp
    if (keyIsDown(LEFT_ARROW)) {
      this.speedX = -4;
      this.animateLeft();
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.speedX = 4;
      this.animateRight();
    } else if (keyIsDown(UP_ARROW)) {
      this.speedY = -4;
      this.animateUp();
    } else if (keyIsDown(DOWN_ARROW)) {
      this.speedY = 4;
      this.animateDown();
    } else if (!keyIsPressed) {
      this.speedX = 0;
      this.speedY = 0;
    }

    // Ändra position utifrån hastighet
    this.x += this.speedX;
    this.y += this.speedY;
    //kontrollerar om man redan tryckt på p kan bara släppa en bomb i taget.
    if (keyIsDown(80) && !this.wasKeyPressed) {
      this.dropBomb(this.x, this.y);
      this.wasKeyPressed = true;
    } else if (!keyIsDown(80)) {
      this.wasKeyPressed = false;
    }
  }
  public dropBomb(positionX: number, positionY: number): void {
    const bomb = new Bomb(positionX, positionY, 50);
    this.addBomb(bomb);
  }

  private animateLeft(): void {
    this.image =
      assets.images.player1Animations[
        this.leftAnimationLoop[
          Math.floor(this.animationIndex) % this.leftAnimationLoop.length
        ]
      ];

    this.animationIndex =
      (this.animationIndex + this.animationSpeed) %
      (this.leftAnimationLoop.length * this.animationSpeed);
  }

  private animateRight(): void {
    this.image =
      assets.images.player1Animations[
        this.rightAnimationLoop[
          Math.floor(this.animationIndex) % this.rightAnimationLoop.length
        ]
      ];

    this.animationIndex =
      (this.animationIndex + this.animationSpeed) %
      (this.rightAnimationLoop.length * this.animationSpeed);
  }

  private animateUp(): void {
    this.image =
      assets.images.player1Animations[
        this.upAnimationLoop[
          Math.floor(this.animationIndex) % this.upAnimationLoop.length
        ]
      ];

    this.animationIndex =
      (this.animationIndex + this.animationSpeed) %
      (this.upAnimationLoop.length * this.animationSpeed);
  }

  private animateDown(): void {
    this.image =
      assets.images.player1Animations[
        this.downAnimationLoop[
          Math.floor(this.animationIndex) % this.downAnimationLoop.length
        ]
      ];

    this.animationIndex =
      (this.animationIndex + this.animationSpeed) %
      (this.downAnimationLoop.length * this.animationSpeed);
  }
}
