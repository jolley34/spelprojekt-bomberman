interface IAddEntity {
  addEntity(entity: GameEntity): void;
  entities: GameEntity[];
}

class GameBoard implements IAddEntity {
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
    icon: p5.Image
  ) {
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
      // Change the image accordingly to the player1
      assets.images.playerAnimations[0],
      3,
      width / 2 - 550,
      50,
      1
    );
    this.playerCard2 = new PlayerCard(
      "Player 2",
      // Change the image accordingly to the player2
      assets.images.entities[2],
      3,
      width / 2 + 550,
      50,
      2
    );
  }

  public setupGameBackground() {
    createCanvas(windowWidth, windowHeight);
  }

  public drawGameBackground() {
    image(this.backgroundImage, 0, 0, width, height);
  }

  private checkCollision() {
    for (const entity1 of this.entities) {
      for (const entity2 of this.entities) {
        if (entity1 === entity2) continue;

        // Bomben ska inte krocka med något
        // Explosioner ska krocka med hinder och spelare.
        // Spelaren ska krocka med explosioner, hinder och powerups.

        if (entity1 instanceof Bomb || entity2 instanceof Bomb) continue;
        if (entity1 instanceof Player && entity2 instanceof Player) continue;

        // Kolla om entitierna överlappar varandra
        // 1. Identifiera faktiska krockar
        // Definera höger och vänster sida för varje entitet
        const l1 = entity1.x;
        const r1 = entity1.x + entity1.size;
        const l2 = entity2.x;
        const r2 = entity2.x + entity2.size;
        const t1 = entity1.y;
        const b1 = entity1.y + entity1.size;
        const t2 = entity2.y;
        const b2 = entity2.y + entity2.size;

        if (l2 < r1 && l1 < r2 && t2 < b1 && t1 < b2) {
          this.reactToCollision(entity1, entity2);
        }
      }
    }
  }

  private reactToCollision(entity1: GameEntity, entity2: GameEntity) {
    if (entity1 instanceof Explosion && entity2 instanceof RemovebleObstacle) {
      entity2.shouldBeRemoved = true;
    }
    if (entity1 instanceof Player && entity2 instanceof SpeedUp) {
      entity1.increaseSpeed();
      entity2.shouldBeRemoved = true;
    }
    if (entity1 instanceof Player && entity2 instanceof SlowDownOpponent) {
      const opponent = this.getOpponent(entity1);
      if (opponent) {
        opponent.decreaseSpeed();
      }
      entity2.shouldBeRemoved = true;
    }

    if (entity1 instanceof Player && entity2 instanceof Explosion) {
      if (!entity1.isProtectd) {
        // Remove a life from the appropriate player card
        if (entity1.getID() === this.playerCard1.playerNumber) {
          this.playerCard1.removeLife();
        } else if (entity1.getID() === this.playerCard2.playerNumber) {
          this.playerCard2.removeLife();
        }

        // Set the player to be protected
        entity1.isProtectd = true;
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
      entity1.x -= entity1.speedX;
      entity1.y -= entity1.speedY;
    }
  }

  private handleGameOver() {
    if (this.playerCard1.lives <= 0) {
      this.endOfGame.setWinner("Player 2");
      this.endOfGame.setWinnerIcon(this.playerCard2.icon);
    } else if (this.playerCard2.lives <= 0) {
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

  public update() {
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

  private removeEntities() {
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

    return isTimeOver || isLifeOver;
  }

  public draw() {
    this.drawGameBackground();
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].draw();
    }
    this.timer.drawTimer();
    this.playerCard1.draw();
    this.playerCard2.draw();
    this.clouds.draw();
    this.flowers.draw();
    this.endOfGame.draw();
  }
}

// const entitet = new Obstacle(0,0,10);
// if (entitet instanceof Obstacle) {
//   // reagera baserat på att entiteten är ett hinder...
// }
