/// <reference path="gameEntity.ts" />
class Bomb extends GameEntity {
  public exploded: boolean
  //private explosion: p5.Image
  private explosionRange: number
  //private explosionX: number
  //private explosionY: number  
  //private coolDownTime: number? time? timer?
  


  constructor(x: number, y: number, size: number) {
    super(assets.images.entities[3], x, y, size);
    this.explosionRange = explosionRange;
    this.exploded = false;
  }



  
}
