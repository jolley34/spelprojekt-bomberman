class Flowers {
  private flowers: {
    image: p5.Image;
    x: number;
    y: number;
    speed: number;
    size: number;
    opacity: number;
  }[];

  constructor() {
    this.flowers = [];
    for (let i = 0; i < 25; i++) {
      this.flowers.push({
        image: random(assets.images.flowers),
        y: random(height),
        x: random(width),
        speed: random(0.5, 2),
        size: random(80, 140),
        opacity: random(100, 170),
      });
    }
  }

  draw() {
    for (let i = 0; i < this.flowers.length; i++) {
      const flower = this.flowers[i];
      flower.x += flower.speed;
      if (flower.x > width) {
        flower.x = -flower.size;
      }
      tint(255, flower.opacity);
      image(flower.image, flower.x, flower.y, flower.size, flower.size);
      noTint();
    }
  }
}
