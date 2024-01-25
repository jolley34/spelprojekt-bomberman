///<reference path="gameEntity.ts" />
class SpeedUp extends GameEntity {
  constructor(x: number, y: number, size: number) {
    super(assets.images.powerups[0], x, y, size);
  }
}

class SlowDown extends GameEntity {
  private speed: number;
  
  constructor(x: number, y: number, size: number) {
    super(assets.images.powerups[1], x, y, size);
    this.speed = -3;
  }

  



  
  
}

