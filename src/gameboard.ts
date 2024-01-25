interface IAddEntity {
  addEntity(entity: GameEntity): void;
}

class GameBoard implements IAddEntity {
  private clouds: Clouds;
  private flowers: Flowers;
  private entities: GameEntity[];
  private backgroundImage: p5.Image;
  private timer: Timer;
  private playerCard1: PlayerCard;
  private playerCard2: PlayerCard;

  constructor(
    entities: GameEntity[],
    backgroundImage: p5.Image,
    player1Icon: p5.Image,
    player2Icon: p5.Image
  ) {
    this.clouds = new Clouds();
    this.flowers = new Flowers();
    this.entities = entities;
    this.backgroundImage = backgroundImage;
    this.timer = new Timer();
    this.playerCard1 = new PlayerCard(
      "Player 1",
      // Change the image accordingly to the player1
      assets.images.player1Animations[0],
      3,
      width / 2 - 550,
      50
    );
    this.playerCard2 = new PlayerCard(
      "Player 2",
      // Change the image accordingly to the player2
      assets.images.entities[2],
      3,
      width / 2 + 550,
      50
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
      // Identifiera om det är en spelare
      if (entity1 instanceof Player) {
        // Kontrollera om spelaren krockar med något
        for (const entity2 of this.entities) {
          // Kolla inte krockar med andra spelare (inkl sig själv).
          if (entity2 instanceof Player || entity2 instanceof Bomb) continue;
          // 1. Identifiera faktiska krockar
          // Definera höger och vänster sida för varje entitet
          const l1 = entity1.x;
          const r1 = entity1.x + entity1.size / 1.75;
          const l2 = entity2.x;
          const r2 = entity2.x + entity2.size / 1.75;
          const t1 = entity1.y;
          const b1 = entity1.y + entity1.size / 1.25;
          const t2 = entity2.y;
          const b2 = entity2.y + entity2.size / 1.75;
          if (l2 < r1 && l1 < r2 && t2 < b1 && t1 < b2) {
            entity1.x -= entity1.speedX;
            entity1.y -= entity1.speedY;
            // 2. Gör rätt sak berode på vad spelare krockar med (reaktionen)
          }
        }
      }
    }
  }
  // om R1 är mindre än L2 så är det ingen krock men om L2 är mindre än R1 har vi KANSKE en krock.
  // R2 är mindre än L1 = ingen krock, men L1 är mindre än R2 är en krock
  // R = x + w
  // L = x
  // en if sats med 4 rader VILL VI HAA, 2 med x och 2 med y

  private pickUpPowerUp() {
    for (const entity of this.entities) {
      // Kolla om det är en power up
      if (entity instanceof SpeedUp) {
        // kolla om den krockar med en spelare
        for (const player of this.entities) {
          if (player instanceof Player) {
            // kolla om det blir en krock mellan poerup och spelare
            const l1 = player.x;
            const r1 = player.x + player.size;
            const t1 = player.y;
            const b1 = player.y + player.size;

            const l2 = entity.x;
            const r2 = entity.x + entity.size;
            const t2 = entity.y;
            const b2 = entity.y + entity.size;

            if (l2 < r1 && l1 < r2 && t2 < b1 && t1 < b2) {
              // om spelaren krockar så....
              player.increaseSpeed(); // metod som ökar hastigheten i class player
              // sen ta bort power upen från spelplanen
              this.entities.splice(this.entities.indexOf(entity), 1);
              // vill lägga till en timer för hur lång tid man har denna power up!!!
            }
          }
        }
      }
    }
  }

  public update() {
    // Loop over all entities and update them
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].update(this);
    }

    // for (const entity of this.entities) {
    //   entity.update();
    // }

    this.pickUpPowerUp(); // uppdatera powerup

    this.checkCollision();
  }

  public addEntity(entity: GameEntity) {
    this.entities.push(entity);
  }

  public startGame() {
    this.timer.start();
  }

  public endGame() {
    this.timer.stop();
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
  }
}
// const entitet = new Obstacle(0,0,10);
// if (entitet instanceof Obstacle) {
//   // reagera baserat på att entiteten är ett hinder...
// }
