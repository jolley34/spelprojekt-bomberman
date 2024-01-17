let backgroundImage: p5.Image;
let clouds: {
  image: p5.Image;
  x: number;
  y: number;
  speed: number;
}[] = [];

class Clouds {
  public preload() {
    //Våg 1 av moln
    clouds.push({
      image: loadImage("./assets/clouds/smoke2.png"),
      x: 400,
      y: 550,
      speed: 0.25,
    });
    clouds.push({
      image: loadImage("./assets/clouds/smoke1.png"),
      x: 1000,
      y: 300,
      speed: 0.25,
    });
    clouds.push({
      image: loadImage("./assets/clouds/smoke1.png"),
      x: -50,
      y: 5,
      speed: 0.25,
    });
    clouds.push({
      image: loadImage("./assets/clouds/smoke2.png"),
      x: -200,
      y: 200,
      speed: 0.3,
    });
    clouds.push({
      image: loadImage("./assets/clouds/smoke2.png"),
      x: -200,
      y: 400,
      speed: 0.2,
    });
    clouds.push({
      image: loadImage("./assets/clouds/smoke4.png"),
      x: -200,
      y: 600,
      speed: 0.3,
    });
    clouds.push({
      image: loadImage("./assets/clouds/smoke4.png"),
      x: 0,
      y: 50,
      speed: 0.22,
    });
    //Våg 2 av moln
    clouds.push({
      image: loadImage("./assets/clouds/smoke1.png"),
      x: -1000,
      y: 5,
      speed: 0.25,
    });
    clouds.push({
      image: loadImage("./assets/clouds/smoke2.png"),
      x: -1100,
      y: 200,
      speed: 0.3,
    });
    clouds.push({
      image: loadImage("./assets/clouds/smoke2.png"),
      x: -1200,
      y: 400,
      speed: 0.2,
    });
    clouds.push({
      image: loadImage("./assets/clouds/smoke4.png"),
      x: -1500,
      y: 600,
      speed: 0.3,
    });
    clouds.push({
      image: loadImage("./assets/clouds/smoke4.png"),
      x: -900,
      y: 50,
      speed: 0.22,
    });
  }
  public setup() {
    createCanvas(windowWidth, windowHeight);
  }
  public draw() {
    for (let i = 0; i < clouds.length; i++) {
      let cloud = clouds[i];
      image(cloud.image, cloud.x, cloud.y, 300, 300);

      cloud.x += cloud.speed;

      if (cloud.x > width) {
        cloud.x = -100;
      }
    }
  }
}

class GameboardBackground {
  private image: p5.Image;

  constructor(image: p5.Image) {
    this.image = image;
  }

  public preload() {
    this.image = loadImage("./assets/background/Map1-blurred.png");
  }

  public setup() {
  }

  public draw() {
    background(this.image);
  }
}

class Gameboard {
  public entities = [];

  public numbers = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  public blockSize = 37;

  public setup() {}

  public preload() {}

  public draw() {
    const centerX = width / 2 - (this.numbers[0].length * this.blockSize) / 2;
    const centerY = height / 2 - (this.numbers.length * this.blockSize) / 2;

    for (let i = 0; i < this.numbers.length; i++) {
      for (let j = 0; j < this.numbers[i].length; j++) {
        const x = centerX + j * this.blockSize;
        const y = centerY + i * this.blockSize;

        if (this.numbers[i][j] === 1) {
          fill("green");
          rect(x, y, this.blockSize, this.blockSize);
        }
        if (this.numbers[i][j] === 0) {
          fill("lightgreen");
          rect(x, y, this.blockSize, this.blockSize);
        }
      }
    }
  }
}
