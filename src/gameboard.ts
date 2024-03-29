interface IAddEntity {
  addEntity(entity: GameEntity): void;
  entities: GameEntity[];
}

class GameBoard implements IAddEntity {
  private boardNumber: number;
  private snow: Snow;
  private clouds: Clouds;
  private flowers: Flowers;
  public entities: GameEntity[];
  private backgroundImage: p5.Image;
  private timer: Timer;
  private playerCard1: PlayerCard;
  private playerCard2: PlayerCard;
  private endOfGame: EndOfGame;
  private icon: p5.Image;
  private isGameActive: boolean;

  constructor(
    entities: GameEntity[],
    backgroundImage: p5.Image,
    icon: p5.Image,
    boardNumber: number
  ) {
    this.snow = new Snow();
    this.boardNumber = boardNumber;
    this.clouds = new Clouds();
    this.flowers = new Flowers();
    this.entities = entities;
    this.backgroundImage = backgroundImage;
    this.timer = new Timer();
    this.icon = icon;
    this.endOfGame = new EndOfGame(game, this.icon);
    this.isGameActive = true;
    this.playerCard1 = new PlayerCard(
      "Player 1",
      assets.images.playerAnimations[0],
      3,
      width / 2 - 550,
      50,
      1
    );
    this.playerCard2 = new PlayerCard(
      "Player 2",
      assets.images.playerAnimations[12],
      3,
      width / 2 + 550,
      50,
      2
    );
  }

  public setupGameBackground(): void {
    createCanvas(windowWidth, windowHeight);
  }

  public drawGameBackground(): void {
    image(this.backgroundImage, 0, 0, width, height);
  }

  private checkCollision(): void {
    for (const entity1 of this.entities) {
      for (const entity2 of this.entities) {
        if (entity1 === entity2) continue;

        // Bomben ska inte krocka med något
        // Explosioner ska krocka med hinder och spelare.
        // Spelaren ska krocka med explosioner, hinder och powerups.

        if (entity1 instanceof Player && entity2 instanceof Player) continue;

        // Kolla om entitierna överlappar varandra
        // 1. Identifiera faktiska krockar
        // Definera höger och vänster sida för varje entitet
        const hitBox1 = entity1.getHitBox();
        const hitBox2 = entity2.getHitBox();

        // checks hitbox for collisions
        if (
          hitBox1.left < hitBox2.left + hitBox2.width &&
          hitBox1.left + hitBox1.width > hitBox2.left &&
          hitBox1.top < hitBox2.top + hitBox2.height &&
          hitBox1.top + hitBox1.height > hitBox2.top
        ) {
          this.reactToCollision(entity1, entity2);
        }
      }
    }
  }

  private reactToCollision(entity1: GameEntity, entity2: GameEntity): void {
    if (
      entity1 instanceof Player &&
      entity2 instanceof Bomb &&
      entity1.getID() !== entity2.ownerId
    ) {
      entity1.x -= entity1.speedX;
      entity1.y -= entity1.speedY;
    }
    if (
      entity1 instanceof Explosion &&
      entity2 instanceof RemovebleObstacle &&
      !entity1.shouldBeRemoved
    ) {
      entity2.shouldBeRemoved = true;
    }
    if (entity1 instanceof Player && entity2 instanceof SpeedUp) {
      assets.playerSoundEffects.powerupsound[0].setVolume(0.7);
      assets.playerSoundEffects.powerupsound[0].play();
      entity1.increaseSpeed();
      entity2.shouldBeRemoved = true;
    }
    if (entity1 instanceof Player && entity2 instanceof SlowDownOpponent) {
      assets.playerSoundEffects.powerupsound[1].setVolume(0.7);
      assets.playerSoundEffects.powerupsound[1].play();
      const opponent = this.getOpponent(entity1);
      if (opponent) {
        opponent.decreaseSpeed();
      }
      entity2.shouldBeRemoved = true;
    }
    if (entity1 instanceof Player && entity2 instanceof LongerBombRange) {
      assets.playerSoundEffects.powerupsound[2].setVolume(0.7);
      assets.playerSoundEffects.powerupsound[2].play();
      entity1.bombRange += 2;
      entity2.shouldBeRemoved = true;
    }
    if (entity1 instanceof Player && entity2 instanceof MoreBomb) {
      assets.playerSoundEffects.powerupsound[3].setVolume(0.7);
      assets.playerSoundEffects.powerupsound[3].play();
      entity1.pickedUpMooreBombs = true;
      entity2.shouldBeRemoved = true;
    }

    if (
      entity1 instanceof Player &&
      entity2 instanceof Explosion &&
      !entity2.shouldBeRemoved
    ) {
      if (!entity1.isProtected) {
        // Remove a life from the appropriate player card
        if (entity1.getID() === this.playerCard1.playerNumber) {
          this.playerCard1.removeLife();
        } else if (entity1.getID() === this.playerCard2.playerNumber) {
          this.playerCard2.removeLife();
        }

        // Set the player to be protected
        entity1.isProtected = true;
        entity1.protectionTimer = entity1.protectionDuration;
      }
    }

    if (this.playerCard1.lives <= 0 || this.playerCard2.lives <= 0) {
      this.handleGameOver();
    }

    if (
      entity1 instanceof Player &&
      (entity2 instanceof StaticObstacle ||
        entity2 instanceof RemovebleObstacle)
    ) {
      const overlapX = Math.min(
        entity1.x + entity1.size - entity2.x,
        entity2.x + entity2.size - entity1.x
      );
      const overlapY = Math.min(
        entity1.y + entity1.size - entity2.y,
        entity2.y + entity2.size - entity1.y
      );

      if (overlapX < overlapY) {
        if (entity1.x + entity1.size / 2 < entity2.x + entity2.size / 2) {
          entity1.x = entity2.x - entity1.size;
        } else {
          entity1.x = entity2.x + entity2.size;
        }
      } else {
        if (entity1.y + entity1.size / 2 < entity2.y + entity2.size / 2) {
          entity1.y = entity2.y - entity1.size;
        } else {
          entity1.y = entity2.y + entity2.size;
        }
      }
    }
  }

  private handleGameOver(): void {
    if (this.playerCard1.lives <= 0 && this.playerCard2.lives <= 0) {
      // Case where both players have no lives left
      this.endOfGame.setWinner("You both suck, try again!");
    } else if (this.playerCard1.lives <= 0) {
      // Case where player 1 has no lives left
      this.endOfGame.setWinner("Player 2");
      this.endOfGame.setWinnerIcon(this.playerCard2.icon);
    } else if (this.playerCard2.lives <= 0) {
      // Case where player 2 has no lives left
      this.endOfGame.setWinner("Player 1");
      this.endOfGame.setWinnerIcon(this.playerCard1.icon);
    }

    this.endGame();
  }

  private getOpponent(currentPlayer: Player): Player | null {
    // Assuming there are only two players
    return this.entities.find(
      (entity) => entity instanceof Player && entity !== currentPlayer
    ) as Player | null;
  }

  // om R1 är mindre än L2 så är det ingen krock men om L2 är mindre än R1 har vi KANSKE en krock.
  // R2 är mindre än L1 = ingen krock, men L1 är mindre än R2 är en krock
  // R = x + w
  // L = x
  // en if sats med 4 rader VILL VI HAA, 2 med x och 2 med y

  public update(): void {
    if (!this.isGameActive) {
      this.endOfGame.update();
      return;
    }
    for (const entity of this.entities) {
      entity.update(this);
    }
    if (this.isGameOver()) {
      this.endGame();
    }
    this.checkCollision();
    this.removeEntities();
  }

  private removeEntities(): void {
    for (let i = 0; i < this.entities.length; i++) {
      if (this.entities[i].shouldBeRemoved) {
        this.entities.splice(i, 1);
        i--;
      }
    }
    this.endOfGame.update();
  }

  public addEntity(entity: GameEntity) {
    this.entities.push(entity);
  }

  public startGame() {
    this.timer.start();
  }

  public endGame() {
    this.isGameActive = false;
    this.timer.stop();
    this.endOfGame.show();
  }

  public isGameOver(): boolean {
    // Handle the case when the time is over
    const isTimeOver = this.timer.getTime() === "00:00";

    // Hndle the case when one of the players has no lives left
    const isLifeOver =
      this.playerCard1.lives <= 0 || this.playerCard2.lives <= 0;

    if (isTimeOver) {
      this.endOfGame.setWinner("Time's up losers!");
    } else if (isLifeOver) {
      this.handleGameOver();
    }

    return isTimeOver || isLifeOver;
  }

  public draw(): void {
    this.drawGameBackground();
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].draw();
    }
    this.timer.drawTimer();
    this.playerCard1.draw();
    this.playerCard2.draw();
    this.clouds.draw();

    if (this.boardNumber === 1) {
      this.flowers.draw();
    }

    if (this.boardNumber === 2) {
      this.snow.draw();
    }

    this.endOfGame.draw();
  }
}
