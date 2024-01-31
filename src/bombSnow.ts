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
          speed: random(2, 4),
          size: random(12, 22),
        });
      }
    }
  
    public update() {
        for (let i = 0; i < this.snowflakes.length; i++) {
            const snowflake = this.snowflakes[i];
            snowflake.y += snowflake.speed;
            //resettar till 0 så att det inte samlas
            if (snowflake.y > height) {
              snowflake.y = 0;
              snowflake.x = random(width);
            }
          }
    }
  
    public draw() {
      for (let i = 0; i < this.snowflakes.length; i++) {
        const snowflake = this.snowflakes[i];
        image(snowflake.image, snowflake.x, snowflake.y, snowflake.size, snowflake.size);
      }
    }
  }
  