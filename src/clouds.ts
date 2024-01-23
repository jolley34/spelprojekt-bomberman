class Clouds {
  private clouds: {
    image: p5.Image;
    x: number;
    y: number;
    speed: number;
    size: number;
    opacity: number;
  }[] = [];

  constructor() {
    //Våg 1 av mo,
    this.clouds = [
      {
        image: assets.images.clouds[0],
        x: 400,
        y: 550,
        speed: 0.25,
        size: 300,
        opacity: 160,
      },
      {
        image: assets.images.clouds[0],
        x: 1000,
        y: 300,
        speed: 0.25,
        size: 300,
        opacity: 160,
      },
      {
        image: assets.images.clouds[0],
        x: -50,
        y: 5,
        speed: 0.25,
        size: 300,
        opacity: 160,
      },
      {
        image: assets.images.clouds[0],
        x: -200,
        y: 200,
        speed: 0.3,
        size: 300,
        opacity: 160,
      },
      {
        image: assets.images.clouds[0],
        x: -200,
        y: 400,
        speed: 0.2,
        size: 300,
        opacity: 160,
      },
      {
        image: assets.images.clouds[0],
        x: -200,
        y: 600,
        speed: 0.3,
        size: 300,
        opacity: 160,
      },
      {
        image: assets.images.clouds[0],
        x: 0,
        y: 50,
        speed: 0.22,
        size: 300,
        opacity: 160,
      },
      {
        image: assets.images.clouds[0],
        x: -1000,
        y: 5,
        speed: 0.25,
        size: 300,
        opacity: 160,
      },
      {
        image: assets.images.clouds[0],
        x: -1100,
        y: 200,
        speed: 0.3,
        size: 300,
        opacity: 160,
      },
      {
        image: assets.images.clouds[0],
        x: -1200,
        y: 400,
        speed: 0.2,
        size: 300,
        opacity: 160,
      },
      {
        image: assets.images.clouds[0],
        x: -1500,
        y: 600,
        speed: 0.3,
        size: 300,
        opacity: 160,
      },
      {
        image: assets.images.clouds[0],
        x: -900,
        y: 50,
        speed: 0.22,
        size: 300,
        opacity: 160,
      },
    ];
  }

  public draw() {
    for (let i = 0; i < this.clouds.length; i++) {
      let cloud = this.clouds[i];

      tint(255, cloud.opacity);
      image(cloud.image, cloud.x, cloud.y, cloud.size, cloud.size);
      noTint();

      cloud.x += cloud.speed;

      if (cloud.x > width) {
        cloud.x = -cloud.size;
      }
    }
  }
}
