class Snowfall {
    private snowflakes: {
      image: p5.Image;
      x: number;
      y: number;
      speed: number;
      size: number;
    }[];
  
    constructor() {
      this.snowflakes = [];
      for (let i = 0; i < 50; i++) {
        this.snowflakes.push({
          image: random(assets.images.bombs), // använd bomb bilder som snö
          y: random(-height, 0),
          x: random(width),
          speed: random(1.5, 2.5),
          size: random(12, 22),
        });
      }
    }
  
    public update() {
      
    }
  
    public draw() {
      for (let i = 0; i < this.snowflakes.length; i++) {
        const snowflake = this.snowflakes[i];
        image(snowflake.image, snowflake.x, snowflake.y, snowflake.size, snowflake.size);
      }
    }
  }
  