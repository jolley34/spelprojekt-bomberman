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
	// private player1Icon: p5.Image;

	constructor(
		entities: GameEntity[],
		backgroundImage: p5.Image
		//player1Icon: p5.Image,
		//player2Icon: p5.Image
	) {
		this.clouds = new Clouds();
		this.flowers = new Flowers();
		this.entities = entities;
		this.backgroundImage = backgroundImage;
		this.timer = new Timer();
		this.playerCard1 = new PlayerCard(
			"Player 1",
			//player1Icon,
			3,
			width / 2 - 550,
			50
		);
		this.playerCard2 = new PlayerCard(
			"Player 2",
			// player2Icon,
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
			for (const entity2 of this.entities) {
				if (entity1 === entity2) continue;

				// Bomben ska inte krocka med något
				// Explosioner ska krocka med hinder och spelare.
				// Spelaren ska krocka med explosioner, hinder och powerups.

				if (entity1 instanceof Bomb || entity2 instanceof Bomb) continue;
				if (entity1 instanceof Player && entity2 instanceof Player) continue;

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
			// entity1.id
			this.playerCard1.removeLife();
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
		// Loop over all entities and update them
		for (const entity of this.entities) {
			entity.update(this);
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
