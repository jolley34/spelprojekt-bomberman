class bombfall {
    private bombflakes: {
      image: p5.Image;
      x: number;
      y: number;
      speed: number;
      size: number;
    }[];
  
    constructor() {
      this.bombflakes = [];
      for (let i = 0; i < 50; i++) {
        this.bombflakes.push({
          image: random(assets.images.bombs), // använd bomb bilder som snö
          y: random(-height, 0),
          x: random(width),
          speed: random(2, 4),
          size: random(12, 22),
        });
      }
    }
  
    public update() {
        for (let i = 0; i < this.bombflakes.length; i++) {
            const bombflake = this.bombflakes[i];
            bombflake.y += bombflake.speed;
            //resettar till 0 så att det inte samlas
            if (bombflake.y > height) {
              bombflake.y = 0;
              bombflake.x = random(width);
            }
          }
    }
  
    public draw() {
      for (let i = 0; i < this.bombflakes.length; i++) {
        const bombflake = this.bombflakes[i];
        image(bombflake.image, bombflake.x, bombflake.y, bombflake.size, bombflake.size);
      }
    }
  }
  