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

  private wasKeyPressed: boolean;


  constructor(x: number, y: number, size: number, controls: Controls) {
    super(assets.images.player1Animations[0], x, y, size);
    this.controls = controls;
    this.speedX = 0;
    this.speedY = 0;
    this.animationIndex = 0;
    this.animationSpeed = 0.8;

    this.increasedSpeed = 2;
    this.powerUpDuration = 10000;
    this.powerUpTimer = 0;

    this.wasKeyPressed = false;


    // Vilka bilder jag loopar igenom när jag trycker vänster
    this.leftAnimationLoop = [7, 6, 8, 6];
    this.rightAnimationLoop = [10, 9, 11, 9];
    this.upAnimationLoop = [4, 3, 5, 3];
    this.downAnimationLoop = [1, 0, 2, 0];
  }

  public update(): void {
    // Sätter hastigheten utifrån vad spelaren trycker på för knapp

    if (keyIsDown(this.controls.left)) {
      this.speedX = -this.getEffectiveSpeed();
      this.animateLeft();
    } else if (keyIsDown(this.controls.right)) {
      this.speedX = this.getEffectiveSpeed();
      this.animateRight();
    } else if (keyIsDown(this.controls.up)) {
      this.speedY = -this.getEffectiveSpeed();
      this.animateUp();
    } else if (keyIsDown(this.controls.down)) {
      this.speedY = this.getEffectiveSpeed();
      this.animateDown();
    } else if (!keyIsPressed) {
      this.speedX = 0;
      this.speedY = 0;
    }
    // Ändra position utifrån hastighet
    this.x += this.speedX;
    this.y += this.speedY;


    //kollar om power up är tagen och om tiden runnit ut
    if (this.powerUpTimer > 0){
      this.powerUpTimer -= deltaTime;
      if (this.powerUpTimer <= 0){
        this.resetPowerUp();
      }
    }

    //kontrollerar om man redan tryckt på p kan bara släppa en bomb i taget.
    if (keyIsDown(this.controls.placeBomb) && !this.wasKeyPressed) {
      this.dropBomb(this.x, this.y);
      this.wasKeyPressed = true;
    } else if (!keyIsDown(this.controls.placeBomb)) {
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

  // powerup "increaseSpeed" gör att spelaren ökar farten efter den har plockat upp powerup, "getEffectiveSpeed" ligger under kontrollerna högre upp i koden
  private getEffectiveSpeed(): number {
    return this.increasedSpeed > 0 && this.powerUpTimer > 0 ? this.increasedSpeed : 4;
  }

  // hur mycket farten skall öka för spelaren efter powerup
  public increaseSpeed(): void {
    this.increasedSpeed = 6;
    this.powerUpTimer = this.powerUpDuration;
  }

  private resetPowerUp(): void {
    this.increasedSpeed = 0;
    this.powerUpTimer = 0;
  }
}
