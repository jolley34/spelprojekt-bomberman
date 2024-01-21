//Bomb.ts


class Bomb {
    private x: number;
    private y: number;
    private timer: number;
    private exploded: boolean;
  
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.timer = 400; // Bomb duration in seconds
      this.exploded = false;
    }
  
    public update(): void { 
      if (!this.exploded) {
        this.timer--;
  
        if (this.timer <= 0) {
          this.exploded = true;
        }
      }
    }
  
    public shouldExplode(): boolean {
      return this.exploded;
    }
  
    public explode(): void {
      console.log("Boom!", this.x, this.y);
     // Here you can add visual or sound effects to the explosion
    }
  
    public drawBomb(): void {
      if (!this.exploded) {
        push();
        fill("red"); // Color bomb
        ellipse(this.x, this.y, 40, 40);  // Bomb size
        pop();
      }
    }
  }