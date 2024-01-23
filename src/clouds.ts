class Clouds {
  private clouds: {
    image: p5.Image;
    x: number;
    y: number;
    speed: number;
    size: number;
    opacity: number;
  }[];

  constructor() {
    this.clouds = [];
    for (let i = 0; i < 13; i++) {
      this.clouds.push({
        image: random(assets.images.clouds),
        y: random(height),
        x: random(width),
        speed: random(0.15, 0.4),
        size: random(125, 250),
        opacity: random(100, 140),
      });
    }
  }

  draw() {
    for (let i = 0; i < this.clouds.length; i++) {
      const clouds = this.clouds[i];
      clouds.x += clouds.speed;
      if (clouds.x > width) {
        clouds.x = -clouds.size;
      }
      tint(255, clouds.opacity);
      image(clouds.image, clouds.x, clouds.y, clouds.size, clouds.size);
      noTint();
    }
  }
}
