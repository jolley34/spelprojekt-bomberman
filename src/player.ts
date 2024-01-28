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
  private leftAnimationLoop: number[];
  private rightAnimationLoop: number[];
  private upAnimationLoop: number[];
  private downAnimationLoop: number[];
  private increasedSpeed: number;
  private powerUpDuration: number;
  private powerUpTimer: number;
  public playerId: number;
  public isHit: boolean;

  private wasKeyPressed: boolean;

  constructor(
    x: number,
    y: number,
    size: number,
    playerId: number,
    controls: Controls
  ) {
    super(assets.images.player1Animations[0], x, y, size);
    this.controls = controls;
    this.speedX = 0;
    this.speedY = 0;
    this.animationIndex = 0;
    this.animationSpeed = 0.8;

    this.increasedSpeed = 2;
    this.powerUpDuration = 10000;
    this.powerUpTimer = 0;
    this.playerId = playerId;
    this.isHit = false;

    this.wasKeyPressed = false;

    // Vilka bilder jag loopar igenom när jag trycker vänster
    this.leftAnimationLoop = [7, 6, 8, 6];
    this.rightAnimationLoop = [10, 9, 11, 9];
    this.upAnimationLoop = [4, 3, 5, 3];
    this.downAnimationLoop = [1, 0, 2, 0];
  }

  public update(gameBoard: IAddEntity): void {
    // Sätter hastigheten utifrån vad spelaren trycker på för knapp
    let horizontalSpeed = 0;
    let verticalSpeed = 0;

    if (keyIsDown(this.controls.left)) {
      horizontalSpeed = -this.getEffectiveSpeed();
      this.animateLeft();
    } else if (keyIsDown(this.controls.right)) {
      horizontalSpeed = this.getEffectiveSpeed();
      this.animateRight();
    }

    if (keyIsDown(this.controls.up)) {
      verticalSpeed = -this.getEffectiveSpeed();
      this.animateUp();
    } else if (keyIsDown(this.controls.down)) {
      verticalSpeed = this.getEffectiveSpeed();
      this.animateDown();
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
    this.isHit = false;
  }

  public dropBomb(
    positionX: number,
    positionY: number,
    gameBoard: IAddEntity
  ): void {
    if (!gameBoard.entities.filter((entity) => entity instanceof Bomb).length) {
      const bomb = new Bomb(positionX, positionY, 50);
      gameBoard.addEntity(bomb);
    }
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
