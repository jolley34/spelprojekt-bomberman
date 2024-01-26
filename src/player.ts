class Player extends GameEntity {
  private controls: any;
  public speedX: number;
  public speedY: number;
  private animationIndex: number;
  private animationSpeed: number;
  private leftAnimationLoop: number[];
  private rightAnimationLoop: number[];
  private upAnimationLoop: number[];
  private downAnimationLoop: number[];
  private increasedSpeed: number;
  private powerUpDuration: number;
  private powerUpTimer: number;
  private wasKeyPressed: boolean;
  private lastDirection: string;
  private idleAnimations: any; // Define idleAnimations property

  constructor(
    x: number,
    y: number,
    size: number,
    controls: Controls,
    leftAnimation: number[],
    rightAnimation: number[],
    upAnimation: number[],
    downAnimation: number[],
    idleAnimations: {
      playerLeftIdle: number[];
      playerRightIdle: number[];
      playerUpIdle: number[];
      playerDownIdle: number[];
      playerDefaultIdle: number[];
    } // Adjust type of idleAnimations parameter
  ) {
    super(assets.images.playerAnimations[0], x, y, size);
    this.controls = controls;
    this.speedX = 0;
    this.speedY = 0;
    this.animationIndex = 0;
    this.animationSpeed = 0.8;

    this.increasedSpeed = 2;
    this.powerUpDuration = 10000;
    this.powerUpTimer = 0;
    this.wasKeyPressed = false;
    this.lastDirection = ""; // Initialize lastDirection

    this.leftAnimationLoop = leftAnimation;
    this.rightAnimationLoop = rightAnimation;
    this.upAnimationLoop = upAnimation;
    this.downAnimationLoop = downAnimation;
    this.idleAnimations = idleAnimations; // Assign idleAnimations to class property
  }

  public update(gameBoard: IAddEntity): void {
    // Sätter hastigheten utifrån vad spelaren trycker på för knapp
    let horizontalSpeed = 0;
    let verticalSpeed = 0;
    let isMoving = false; // Track if player is moving

    if (keyIsDown(this.controls.left)) {
      horizontalSpeed = -this.getEffectiveSpeed();
      this.animateLeft();
      this.lastDirection = "left";
      isMoving = true;
    } else if (keyIsDown(this.controls.right)) {
      horizontalSpeed = this.getEffectiveSpeed();
      this.animateRight();
      this.lastDirection = "right";
      isMoving = true;
    }

    if (keyIsDown(this.controls.up)) {
      verticalSpeed = -this.getEffectiveSpeed();
      this.animateUp();
      this.lastDirection = "up";
      isMoving = true;
    } else if (keyIsDown(this.controls.down)) {
      verticalSpeed = this.getEffectiveSpeed();
      this.animateDown();
      this.lastDirection = "down";
      isMoving = true;
    }

    if (!isMoving) {
      // If the player is not moving, play idle animation based on last direction
      switch (this.lastDirection) {
        case "left":
          this.animateLeftIdle();
          break;
        case "right":
          this.animateRightIdle();
          break;
        case "up":
          this.animateUpIdle();
          break;
        case "down":
          this.animateDownIdle();
          break;
        default:
          // If no last direction is set, play default idle animation
          this.animateDefaultIdle();
          break;
      }
    }

    if (horizontalSpeed !== 0 && verticalSpeed !== 0) {
      const diagonalSpeed = Math.sqrt(
        Math.pow(horizontalSpeed, 2) + Math.pow(verticalSpeed, 2)
      );
      horizontalSpeed =
        (horizontalSpeed / diagonalSpeed) * this.getEffectiveSpeed();
      verticalSpeed =
        (verticalSpeed / diagonalSpeed) * this.getEffectiveSpeed();
    }

    this.speedX = horizontalSpeed;
    this.speedY = verticalSpeed;

    // Ändra position utifrån hastighet
    this.x += this.speedX;
    this.y += this.speedY;

    //kollar om power up är tagen och om tiden runnit ut
    if (this.powerUpTimer > 0) {
      this.powerUpTimer -= deltaTime;
      if (this.powerUpTimer <= 0) {
        this.resetPowerUp();
      }
    }

    //kontrollerar om man redan tryckt på p kan bara släppa en bomb i taget.
    if (keyIsDown(this.controls.placeBomb) && !this.wasKeyPressed) {
      this.dropBomb(this.x, this.y, gameBoard);
      this.wasKeyPressed = true;
    } else if (!keyIsDown(this.controls.placeBomb)) {
      this.wasKeyPressed = false;
    }
  }

  public dropBomb(
    positionX: number,
    positionY: number,
    gameBoard: IAddEntity
  ): void {
    const bomb = new Bomb(positionX, positionY, 50);
    assets.playerSoundEffects.explosion.play();
    gameBoard.addEntity(bomb);
  }

  private animateLeft(): void {
    this.image =
      assets.images.playerAnimations[
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
      assets.images.playerAnimations[
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
      assets.images.playerAnimations[
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
      assets.images.playerAnimations[
        this.downAnimationLoop[
          Math.floor(this.animationIndex) % this.downAnimationLoop.length
        ]
      ];

    this.animationIndex =
      (this.animationIndex + this.animationSpeed) %
      (this.downAnimationLoop.length * this.animationSpeed);
  }

  private animateLeftIdle(): void {
    this.image =
      assets.images.playerAnimations[
        this.idleAnimations.playerLeftIdle[
          Math.floor(this.animationIndex) %
            this.idleAnimations.playerLeftIdle.length
        ]
      ];
  }

  private animateRightIdle(): void {
    this.image =
      assets.images.playerAnimations[
        this.idleAnimations.playerRightIdle[
          Math.floor(this.animationIndex) %
            this.idleAnimations.playerRightIdle.length
        ]
      ];
  }

  private animateUpIdle(): void {
    this.image =
      assets.images.playerAnimations[
        this.idleAnimations.playerUpIdle[
          Math.floor(this.animationIndex) %
            this.idleAnimations.playerUpIdle.length
        ]
      ];
  }

  private animateDownIdle(): void {
    this.image =
      assets.images.playerAnimations[
        this.idleAnimations.playerDownIdle[
          Math.floor(this.animationIndex) %
            this.idleAnimations.playerDownIdle.length
        ]
      ];
  }

  private animateDefaultIdle(): void {
    this.image =
      assets.images.playerAnimations[
        this.idleAnimations.playerDefaultIdle[
          Math.floor(this.animationIndex) %
            this.idleAnimations.playerDefaultIdle.length
        ]
      ];
  }

  // powerup "increaseSpeed" gör att spelaren ökar farten efter den har plockat upp powerup, "getEffectiveSpeed" ligger under kontrollerna högre upp i koden
  private getEffectiveSpeed(): number {
    return this.increasedSpeed > 0 && this.powerUpTimer > 0
      ? this.increasedSpeed
      : 2.5;
  }

  // hur mycket farten skall öka för spelaren efter powerup
  public increaseSpeed(): void {
    assets.playerSoundEffects.powerupsound[0].play();
    this.increasedSpeed = 5.25;
    this.powerUpTimer = this.powerUpDuration;
  }

  private resetPowerUp(): void {
    this.increasedSpeed = 0;
    this.powerUpTimer = 0;
  }
}
