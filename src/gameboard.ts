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
  public preload() {
    backgroundImage = loadImage("./assets/background/Map1-blurred.png");
  }

  public setup() {
    createCanvas(windowWidth, windowHeight);
  }

  public draw() {
    background(backgroundImage);
  }
}

class Gameboard {
  private tileSize: number = 52;
  private numRows: number = 11;
  private numCols: number = 15; 

  public setup() {
    createCanvas(windowWidth, windowHeight);
  }

  public draw() {
    const startX = (width - this.numCols * this.tileSize) / 2;
    const startY = (height - this.numRows * this.tileSize) / 2;

    for (let row = 0; row < this.numRows; row++) {
      for (let col = 0; col < this.numCols; col++) {

        const x = startX + col * this.tileSize;
        const y = startY + row * this.tileSize;

        fill(255); 
        stroke(0);
        rect(x, y, this.tileSize, this.tileSize);
      }
    }
  }
}
