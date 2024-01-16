type Controls = {
  up: number;
  left: number;
  down: number;
  right: number;
};


class Player {
 
  private color: string;
  private x: number;
  private y: number;
  private size: number;
  private controls: Controls;
  
  constructor( color: string, x: number, y: number, controls: Controls) {
    this.color = color
    this.y = y;
    this.x = x;
    this.size = 50;
    this.controls = controls;
  }
  public update(){
    this.move()
  }

  private move() {
    if (keyIsPressed) {
      if (keyCode === this.controls.up) {
        this.y -= 10;
      }
      if (keyCode === this.controls.down) {
        this.y += 10;
      }
      if (keyCode === this.controls.left) {
        this.x -= 10;
      }
      if (keyCode === this.controls.right) {
        this.x += 10;
      }
    }
  }
  
  public drawPlayer() {
    push()
    fill(this.color);
    circle(this.x,this.y, this.size*1.15);
    pop();
  }
}
