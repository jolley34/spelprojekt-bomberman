class Bomb extends GameEntity {
    private explosionTime: number;
  
    constructor(image: p5.Image, x: number, y: number, size: number) {
      super(image, x, y, size);
      this.explosionTime = frameCount + 3 * 60;
 }
  
    public update(): void {
      //kollar explosion time 
      if (frameCount >= this.explosionTime) {
        // om tiden har gått ta bort från spelplan
        this.removeFromGame(); 
      }
    }
  
    private removeFromGame(): void {
// Tar bort bomben från spelplan
      this.size = 0;
    }
  }
  