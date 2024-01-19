class Clouds {
  private clouds: {
    image: p5.Image;
    x: number;
    y: number;
    speed: number;
  }[] = [];

  constructor() {
    //Våg 1 av mo,
    this.clouds = [
      {
        image: assets.images.clouds[0],
        x: 400,
        y: 550,
        speed: 0.25,
      },
      {
        image: assets.images.clouds[0],
        x: 1000,
        y: 300,
        speed: 0.25,
      },
      {
        image: assets.images.clouds[0],
        x: -50,
        y: 5,
        speed: 0.25,
      },
      {
        image: assets.images.clouds[0],
        x: -200,
        y: 200,
        speed: 0.3,
      },
      {
        image: assets.images.clouds[0],
        x: -200,
        y: 400,
        speed: 0.2,
      },
      {
        image: assets.images.clouds[0],
        x: -200,
        y: 600,
        speed: 0.3,
      },
      {
        image: assets.images.clouds[0],
        x: 0,
        y: 50,
        speed: 0.22,
      },
      {
        image: assets.images.clouds[0],
        x: -1000,
        y: 5,
        speed: 0.25,
      },
      {
        image: assets.images.clouds[0],
        x: -1100,
        y: 200,
        speed: 0.3,
      },
      {
        image: assets.images.clouds[0],
        x: -1200,
        y: 400,
        speed: 0.2,
      },
      {
        image: assets.images.clouds[0],
        x: -1500,
        y: 600,
        speed: 0.3,
      },
      {
        image: assets.images.clouds[0],
        x: -900,
        y: 50,
        speed: 0.22,
      },
    ];
  }

  public draw() {
    for (let i = 0; i < this.clouds.length; i++) {
      let cloud = this.clouds[i];
      image(cloud.image, cloud.x, cloud.y, 300, 300);

      let opacity = 180;

      tint(255, opacity);

      cloud.x += cloud.speed;

      noTint();

      if (cloud.x > width) {
        cloud.x = -100;
      }
    }
  }
}
