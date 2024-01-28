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
  private decreasedSpeed: number;
  private powerUpDuration: number;
  private powerUpTimer: number;
  private id: number;
  private wasKeyPressed: boolean;
  private lastBombDropTime: number; 

  constructor(x: number, y: number, size: number, controls: Controls, id: number) {
    super(assets.images.player1Animations[0], x, y, size);
    
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
    this.wasKeyPressed = false;
    this.lastBombDropTime = 0;

    // Vilka bilder jag loopar igenom när jag trycker vänster
    this.leftAnimationLoop = [7, 6, 8, 6];
    this.rightAnimationLoop = [10, 9, 11, 9];
    this.upAnimationLoop = [4, 3, 5, 3];
    this.downAnimationLoop = [1, 0, 2, 0];
  }

  getID(): number{
    return this.id;
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

    const currentTime = millis();
    const timeSinceLastDrop = currentTime - this.lastBombDropTime;

    if (keyIsDown(this.controls.up)) {
      verticalSpeed = -this.getEffectiveSpeed();
      this.animateUp();
    } else if (keyIsDown(this.controls.down)) {
      verticalSpeed = this.getEffectiveSpeed();
      this.animateDown();
    }

    // kollar ifall det har gått 4sek since last dropbombtime
    if (keyIsDown(this.controls.placeBomb) && !this.wasKeyPressed && timeSinceLastDrop >= 4000) {
      this.dropBomb(this.x, this.y, gameBoard);
      this.lastBombDropTime = currentTime; // Updaterar lastdropbombtime
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
   

  public dropBomb(
    positionX: number,
    positionY: number,
    gameBoard: IAddEntity
  ): void {
    if (!gameBoard.entities.some((entity) => entity instanceof Bomb)) {
      const bomb = new Bomb(positionX, positionY, 50);
      gameBoard.addEntity(bomb);
      this.wasKeyPressed = false;
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
    assets.playerSoundEffects.powerupsound[0].play();
    this.increasedSpeed = 5.25;
    this.powerUpTimer = this.powerUpDuration;
  }
  public decreaseSpeed(): void {
    assets.playerSoundEffects.powerupsound[0].play();
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
