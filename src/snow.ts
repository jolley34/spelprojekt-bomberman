class Snow {
  private snow: {
    x: number;
    y: number;
    speed: number;
    size: number;
    opacity: number;
  }[];

  constructor() {
    this.snow = [];
    for (let i = 0; i < 1000; i++) {
      this.snow.push({
        y: random(height),
        x: random(width),
        speed: random(0.15, 1.2),
        size: random(1, 5),
        opacity: random(100, 140),
      });
    }
  }

  draw() {
    for (let i = 0; i < this.snow.length; i++) {
      const flake = this.snow[i];
      fill(255, flake.opacity);
      noStroke();
      ellipse(flake.x, flake.y, flake.size, flake.size);
      flake.y += flake.speed;
      if (flake.y > height) {
        flake.y = random(-50, 0);
        flake.x = random(width);
      }
    }
  }
}
