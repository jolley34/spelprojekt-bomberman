/// <reference path="gameEntity.ts" />

type Controls = {
  up: number;
  left: number;
  down: number;
  right: number;
  placeBomb: number;
};

class Player extends GameEntity {
  private controls: any;
  public speedX: number;
  public speedY: number;
  private animationIndex: number;
  private animationSpeed: number;
  private idleAnimations: any;
  private leftAnimationLoop: number[];
  private rightAnimationLoop: number[];
  private upAnimationLoop: number[];
  private downAnimationLoop: number[];
  private increasedSpeed: number;
  private decreasedSpeed: number;
  private powerUpDuration: number;
  private powerUpTimer: number;
  private wasKeyPressed: boolean;
  private lastDirection: string;
  private id: number;
  private bombDropTimer: number;

  public isProtected: boolean = false;
  public protectionDuration: number = 3000;
  public protectionTimer: number;
  public pickedUpMooreBombs: boolean;
  public pickedUpLongerRange: boolean;
  public bombRange: number;

  constructor(
    x: number,
    y: number,
    size: number,
    controls: Controls,
    id: number,
    animations: {
      left: number[];
      right: number[];
      up: number[];
      down: number[];
      idle: {
        left: number[];
        right: number[];
        up: number[];
        down: number[];
        default: number[];
      };
    }
  ) {
    super(
      assets.images.playerAnimations[animations.idle.default[0]],
      x,
      y,
      size
    );
    this.id = id;
    this.controls = controls;
    this.speedX = 0;
    this.speedY = 0;
    this.animationIndex = 0;
    this.animationSpeed = 0.8;
    this.increasedSpeed = 2;
    this.decreasedSpeed = 1.5;
    this.powerUpDuration = 10000;
    this.powerUpTimer = 0;
    this.bombDropTimer = 0;
    this.bombRange = 2;

    this.isProtected = false;
    this.protectionDuration = 3000;
    this.protectionTimer = 0;

    this.wasKeyPressed = false;
    this.lastDirection = "";

    this.leftAnimationLoop = animations.left;
    this.rightAnimationLoop = animations.right;
    this.upAnimationLoop = animations.up;
    this.downAnimationLoop = animations.down;
    this.idleAnimations = animations.idle;
    this.pickedUpMooreBombs = false;
    this.pickedUpLongerRange = false;
  }

  getID(): number {
    return this.id;
  }

  public update(gameBoard: IAddEntity): void {
    this.bombDropTimer -= deltaTime;

    let horizontalSpeed = 0;
    let verticalSpeed = 0;
    let isMoving = false;

    // checking if player is protected and if the time has run out
    if (this.isProtected) {
      this.protectionTimer -= deltaTime;
      if (this.protectionTimer <= 0) {
        this.isProtected = false;
      }
    }

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
          this.animateDefaultIdle();
          break;
      }
    }

    // kollar ifall det har gått 4sek since last dropbombtime
    if (keyIsDown(this.controls.placeBomb) && !this.wasKeyPressed) {
      // Resetar bomb gifsen
      for (let i = 0; i < assets.images.bombs.length; i++) {
        assets.images.bombs[i].reset();
      }
      this.dropBomb(this.x, this.y, gameBoard);

      this.wasKeyPressed = true;
    } else if (!keyIsDown(this.controls.placeBomb)) {
      this.wasKeyPressed = false;
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
  }
  public handleBombTimer(): any {
    if (!this.pickedUpMooreBombs) {
      return (this.bombDropTimer = 2800);
    } else if (this.pickedUpMooreBombs) {
      return (this.bombDropTimer = 1000);
    }
  }

  public dropBomb(
    positionX: number,
    positionY: number,
    gameBoard: IAddEntity
  ): void {
    if (this.bombDropTimer < 0) {
      const bomb = new Bomb(
        positionX,
        positionY,
        50,
        this.id,
        this.bombRange,
        assets.images.bombs[this.id - 1]
      );
      this.bombDropTimer = this.handleBombTimer();
      gameBoard.addEntity(bomb);
      this.wasKeyPressed = false;
    }
  }

  private animateLeft(): void {
    if (this.leftAnimationLoop) {
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
  }

  private animateRight(): void {
    if (this.rightAnimationLoop) {
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
  }

  private animateUp(): void {
    if (this.upAnimationLoop) {
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
  }

  private animateDown(): void {
    if (this.downAnimationLoop) {
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
  }

  private animateLeftIdle(): void {
    if (this.idleAnimations.playerLeftIdle) {
      this.image =
        assets.images.playerAnimations[
          this.idleAnimations.playerLeftIdle[
            Math.floor(this.animationIndex) %
              this.idleAnimations.playerLeftIdle.length
          ]
        ];
    }
  }

  private animateRightIdle(): void {
    if (this.idleAnimations.playerRightIdle) {
      this.image =
        assets.images.playerAnimations[
          this.idleAnimations.playerRightIdle[
            Math.floor(this.animationIndex) %
              this.idleAnimations.playerRightIdle.length
          ]
        ];
    }
  }

  private animateUpIdle(): void {
    if (this.idleAnimations.playerUpIdle) {
      this.image =
        assets.images.playerAnimations[
          this.idleAnimations.playerUpIdle[
            Math.floor(this.animationIndex) %
              this.idleAnimations.playerUpIdle.length
          ]
        ];
    }
  }

  private animateDownIdle(): void {
    if (this.idleAnimations.playerDownIdle) {
      this.image =
        assets.images.playerAnimations[
          this.idleAnimations.playerDownIdle[
            Math.floor(this.animationIndex) %
              this.idleAnimations.playerDownIdle.length
          ]
        ];
    }
  }

  private animateDefaultIdle(): void {
    if (this.idleAnimations.playerDefaultIdle) {
      this.image =
        assets.images.playerAnimations[
          this.idleAnimations.playerDefaultIdle[
            Math.floor(this.animationIndex) %
              this.idleAnimations.playerDefaultIdle.length
          ]
        ];
    }
  }
  // powerup "increaseSpeed" gör att spelaren ökar farten efter den har plockat upp powerup, "getEffectiveSpeed" ligger under kontrollerna högre upp i koden
  private getEffectiveSpeed(): number {
    // Kontrollera om ökad hastighet (increasedSpeed) är större än 0 och powerUpTimer är större än 0
    if (this.increasedSpeed > 0 && this.powerUpTimer > 0) {
      return this.increasedSpeed; // Returnera ökad hastighet om villkoren är uppfyllda
    } else if (this.decreasedSpeed > 0 && this.powerUpTimer > 0) {
      return this.decreasedSpeed; // Returnera minskad hastighet om ökad hastighet inte är aktiv men minskad hastighet är det
    } else {
      return 2.5; // Returnera standardhastighet om inga powerups är aktiva
    }
  }

  // hur mycket farten skall öka för spelaren efter powerup
  public increaseSpeed(): void {
    this.increasedSpeed = 5.25;
    this.powerUpTimer = this.powerUpDuration;
  }
  public decreaseSpeed(): void {
    this.decreasedSpeed = 0.2;
    this.increasedSpeed = 0;
    this.powerUpTimer = this.powerUpDuration;
  }

  private resetPowerUp(): void {
    this.increasedSpeed = 0;
    this.decreasedSpeed = 0;
    this.powerUpTimer = 0;
  }
}
